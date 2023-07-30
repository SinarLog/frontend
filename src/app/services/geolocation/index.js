import { useEffect, useRef, useState } from "react";
import { checkGeolocationEnabled } from "./check";
import { getBrowserName } from "../../utils/strings";

// Components
import InfoModalBackdrop from "../../../components/modals/InfoModalBackdrop";

/**
 * withGeolocation is a HOC where it checks whether or not
 * geolocation is active in the client's browser.
 * @param {React.Component} WrappedComponent
 * @returns {React.Component}
 */
export default function withGeolocation(WrappedComponent) {
  function WithGeolocationComponent() {
    const [agent, setAgent] = useState(
      getBrowserName(window.navigator.userAgent)
    );
    const modalRef = useRef(null);

    useEffect(() => {
      const dialog = modalRef.current;
      (async () => {
        const geolocationEnabled = await checkGeolocationEnabled();
        if (!geolocationEnabled) {
          dialog.removeAttribute("open");
          dialog.showModal();
        }
      })();

      // return () => dialog.close()
      // the above does not work...
      return () => dialog.removeAttribute("open");
    }, []);

    return (
      <>
        <WrappedComponent />
        <InfoModalBackdrop
          id="geolocationModal"
          modalRef={modalRef}
          allowOverflow={false}
          withCloseButton={true}
        >
          <div className="flex flex-col gap-4 p-2 mt-4">
            <h1 className="text-3xl font-bold text-start py-4 border-b border-b-[#F3F3F3]">
              Oops...
            </h1>
            <p className="break-word whitespace-pre-line">
              It seems that your location has been turned off. SinarLog requires
              users to turn on location. There are some guideline to enable
              location from browser
            </p>
            <div>
              <div className="collapse collapse-arrow">
                <input
                  type="radio"
                  name="geolocation-accordion"
                  checked={agent === "Chrome" ? true : false}
                  onChange={() => setAgent("Chrome")}
                />
                <div className="collapse-title text-md font-medium">
                  How to enable location in Chrome
                </div>
                <div className="collapse-content">
                  <ol type="1" className="list-decimal ps-8">
                    <li>
                      <p>
                        Open Chrome and click the <b>three-dotted</b> menu in
                        the top right-hand corner followed by <b>Settings</b>
                      </p>
                    </li>
                    <li>
                      <p>
                        On the Settings page, click <b>Privacy and Security</b>{" "}
                        from the left-hand menu followed by Site Settings
                      </p>
                    </li>
                    <li>
                      <p>
                        Scroll down and click <b>Location</b>
                      </p>
                    </li>
                    <li>
                      <p>
                        You can then toggle the <b>Ask before accessing</b>{" "}
                        (recommend) option to enable location services
                      </p>
                    </li>
                  </ol>
                </div>
              </div>
              <div className="collapse collapse-arrow">
                <input
                  type="radio"
                  name="geolocation-accordion"
                  checked={agent === "Firefox" ? true : false}
                  onChange={() => setAgent("Firefox")}
                />
                <div className="collapse-title text-md font-medium">
                  How to enable location in Mozilla
                </div>
                <div className="collapse-content">
                  <ol type="1" className="list-decimal ps-8">
                    <li>
                      <p>
                        Click the pin icon to the right of the padlock icon
                        (left of the website's URL) to open the site
                        information.
                      </p>
                    </li>
                    <li>
                      <p>
                        Click on the <b>Allow</b> button to grant the website
                        permission to use your location.
                      </p>
                    </li>
                    <li>
                      <p>Refresh the page if needed.</p>
                    </li>
                  </ol>
                </div>
              </div>
              <div className="collapse collapse-arrow">
                <input
                  type="radio"
                  name="geolocation-accordion"
                  checked={agent.includes("Edge") ? true : false}
                  onChange={() => setAgent("Edge")}
                />
                <div className="collapse-title text-md font-medium">
                  How to enable location in Microsoft Edge
                </div>
                <div className="collapse-content">
                  <ol type="1" className="list-decimal ps-8">
                    <li>
                      <p>
                        Click on the padlock icon (left of the website's URL) to
                        view site permissions.
                      </p>
                    </li>
                    <li>
                      <p>Click on the permissions for this site.</p>
                    </li>
                    <li>
                      <p>
                        Select <b>Ask before accessing</b> or <b>Allow</b>{" "}
                        depending on your preference.
                      </p>
                    </li>
                    <li>
                      <p>Refresh the page if necessary.</p>
                    </li>
                  </ol>
                </div>
              </div>
              <div className="collapse collapse-arrow">
                <input
                  type="radio"
                  name="geolocation-accordion"
                  checked={agent === "Safari" ? true : false}
                  onChange={() => setAgent("Safari")}
                />
                <div className="collapse-title text-md font-medium">
                  How to enable location in Safari
                </div>
                <div className="collapse-content">
                  <ol type="1" className="list-decimal ps-8">
                    <li>
                      <p>Click on "Safari" in the top menu.</p>
                    </li>
                    <li>
                      <p>
                        Go to the <b>Websites</b> tab and select <b>Location</b>
                        .
                      </p>
                    </li>
                    <li>
                      <p>
                        Find the website in question and choose <b>Allow</b>{" "}
                        from the drop-down menu to grant location access.
                      </p>
                    </li>
                    <li>
                      <p>Refresh the page if necessary.</p>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
            <div className="p-2 rounded-lg bg-warning-normal bg-opacity-90 text-sm">
              By using this service, you acknowledge and agree to SinarLog's
              terms and conditions
            </div>
          </div>
        </InfoModalBackdrop>
      </>
    );
  }

  return WithGeolocationComponent;
}
