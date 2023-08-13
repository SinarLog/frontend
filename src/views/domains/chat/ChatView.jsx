/* eslint-disable react-hooks/exhaustive-deps */
import ChatContainer from "../../../components/chat/ChatContainer";
import ChatBoxContainer from "../../../components/chat/ChatBoxContainer";
import ChatFriendsList from "../../../components/chat/ChatFriendsList";
import ChatModel from "./ChatModel";
import { useEffect } from "react";

export default function ChatView() {
  const { values, handlers, fetchers } = ChatModel();

  useEffect(() => {
    fetchers.friends();
  }, []);

  return (
    <ChatContainer isChatting={values.isChatting}>
      {values.isChatting ? (
        <ChatBoxContainer
          receiver={values.currentReceiver}
          chats={values.chatRoom?.chats}
          message={values.message}
          allowSend={values.allowSend}
          currentUserId={values.currentUserId}
          sendLoading={values.sendLoading}
          messageOnChange={handlers.message}
          sendCallback={handlers.sendMessage}
          closeCallback={handlers.closeChat}
        />
      ) : (
        <>
          <ChatFriendsList
            friends={values.friends}
            openChatCallback={handlers.openChat}
          />
        </>
      )}
    </ChatContainer>
  );
}
