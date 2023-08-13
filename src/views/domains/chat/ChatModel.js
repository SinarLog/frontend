import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFriends, openChatRoom } from "../../../app/services/api/chat";
import { NotifContext } from "../../../app/context/notif";
import { setFriends, setRoomChat } from "../../../app/store/slices";

/**
 * @typedef {Object} Room
 * @property {string} id
 * @property {string[]} participants
 * @property {string} createdAt
 */

/**
 * @typedef {Object} ChatRoom
 * @property {Room} room
 * @property {Chat[]} chats
 */

export default function ChatModel() {
  const dispatch = useDispatch();
  const { showAlert } = useContext(NotifContext);
  // Friends management
  const [friends, setFriendsLocal] = useState([]);
  const chatFriends = useSelector((state) => state.friends);
  const currentUserId = useSelector((state) => state.currentUser.id);
  // Room and chat management
  const [chatRoom, setChatRoom] = useState(null);
  const [isChatting, setIsChatting] = useState(false);
  const [roomLoading, setRoomLoading] = useState(false);
  const [currentReceiver, setCurrentReceiver] = useState(null);
  // Message management
  const [message, setMessage] = useState("");
  const [allowSend, setAllowSend] = useState(false);
  const [socket, setSocket] = useState(null);
  const [sendLoading, setSendLoading] = useState(false);

  /**
   ****************************
   * HANDLERS SECTION
   ****************************
   */
  const fetchFriends = () => {
    if (chatFriends.length) {
      setFriendsLocal(chatFriends);
      return;
    } else {
      getFriends()
        .then((data) => {
          dispatch(setFriends(data));
          setFriendsLocal(data);
        })
        .catch((err) => {
          showAlert("ERROR", err);
        });
    }
  };

  /**
   ****************************
   * HANDLERS SECTION
   ****************************
   */
  const handleOpenChat = (recipientId) => () => {
    setRoomLoading(true);
    setIsChatting(true);
    setCurrentReceiver(friends.find((item) => item.id === recipientId));

    openChatRoom({ sender: currentUserId, recipient: recipientId })
      .then((data) => {
        dispatch(setRoomChat(data));
        setChatRoom(data);
        handleConnectToChat(data);
      })
      .catch((err) => {
        showAlert("ERROR", err);
      })
      .finally(() => {
        setRoomLoading(false);
      });
  };

  const handleConnectToChat = (data) => {
    try {
      const chatURL = `${
        process.env.NODE_ENV === "development" ? "ws" : "wss"
      }://${process.env.REACT_APP_BACKEND_URL.replace(
        /https?:\/\//g,
        ""
      )}/api/v2/chat/messenger/${data?.room?.id}/${currentUserId}`;
      const socket = new WebSocket(chatURL);
      socket.onmessage = ({ data }) => {
        data = JSON.parse(data);
        const chat = chatRoom?.chats?.find((item) => item.id === data.id);
        if (!chat) {
          setChatRoom((prev) => {
            if (prev) {
              return { ...prev, chats: [...prev.chats, data] };
            }
          });
        }
      };
      setSocket(socket);
    } catch (e) {
      showAlert("ERROR", "Unable to connect to chat.");
    }
  };

  const handleCloseChat = () => {
    setCurrentReceiver(null);
    setIsChatting(false);
    if (socket) {
      socket.close(1000);
    }
  };

  const handleSendMessage = () => {
    try {
      if (socket) {
        setSendLoading(true);
        socket.send(message);
        setMessage("");
        setSendLoading(false);
      }
    } catch (e) {
      showAlert("ERROR", "Unable to send message");
    }
  };

  const handleMessageOnChange = (event) => {
    setMessage(event.target.value);
    if (event.target.value.trim() === "") setAllowSend(false);
    else setAllowSend(true);
  };

  return {
    values: {
      friends,
      currentReceiver,
      currentUserId,

      isChatting,
      roomLoading,
      chatRoom,

      message,
      allowSend,
      sendLoading,
      socket,
    },
    handlers: {
      openChat: handleOpenChat,
      closeChat: handleCloseChat,
      sendMessage: handleSendMessage,
      message: handleMessageOnChange,
    },
    fetchers: {
      friends: fetchFriends,
    },
  };
}
