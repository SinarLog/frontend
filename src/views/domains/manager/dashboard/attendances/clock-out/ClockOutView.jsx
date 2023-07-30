import { getGoogleMapsUrlFromLocation } from "../../../../../../app/utils/strings";

// Components
import InlineLoading from "../../../../../../components/loaders/InlineLoading";
import InfoModalBackdrop from "../../../../../../components/modals/InfoModalBackdrop";

// Assets
import ClockInLight from "../../../../../../assets/icons/clockin-light.svg";
import ClockInDark from "../../../../../../assets/icons/clockin-dark.svg";
import GoogleMapLogo from "../../../../../../assets/images/google-maps.png";

export default function ClockOutView({ values, handlers, refs, blurs }) {
  const isDisabled = values?.geolocationDisbabled || values?.time;
  return (
    <>
      <div className="body-container flex flex-col justify-center gap-2 max-w-sm col-span-1">
        <div
          className="tooltip w-full"
          data-tip={
            values?.geolocationDisbabled
              ? "Please turn on location service to be able to clock out"
              : null
          }
        >
          <button
            type="button"
            className="btn btn-primary-normal text-white normal-case border-transparent w-full"
            disabled={isDisabled}
            onClick={handlers?.request}
          >
            {values?.loading ? (
              <InlineLoading />
            ) : (
              <span className="flex flex-row gap-2 justify-center align-middle items-center">
                {isDisabled ? (
                  <img
                    src={ClockInDark}
                    alt="Clock out"
                    className="rotate-180"
                  />
                ) : (
                  <img
                    src={ClockInLight}
                    alt="Clock in"
                    className="rotate-180"
                  />
                )}{" "}
                Clock Out
              </span>
            )}
          </button>
        </div>
        <h5>{values?.time ?? "Timestamp -"}</h5>
      </div>

      {/* Out of Range Modal */}
      <InfoModalBackdrop
        id="oopsOutOfRangeModal"
        additionalClass="h-max overflow-hidden"
        allowOverflow={false}
      >
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-3xl font-bold">Oops! Out of range</h1>
          <p>
            You're too far from where you clock in. Click the map icon in the
            center of the circle to know your clock in location.
          </p>
          <div className="relative w-80 h-80">
            <a
              href={getGoogleMapsUrlFromLocation(
                values.prevLoc?.lat ?? 0,
                values.prevLoc?.long ?? 0
              )}
              rel="noreferrer"
              target="_blank"
              className="w-6 h-6 absolute top-[9.25rem] left-0 right-0 ml-auto mr-auto text-xs text-center z-10"
            >
              <div
                className="w-6 h-6 rounded-full p-0"
                style={{
                  backgroundImage: `url(${GoogleMapLogo})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
            </a>
            <div className="rounded-full w-full h-full flex relative circle-outer-oops animate-spin-slow z-0">
              <div className="rounded-full w-60 h-60 absolute left-0 right-0 ml-auto mr-auto place-self-center flex-1 circle-inner-oops-warning z-10"></div>
              <div className="rounded-full w-40 h-40 absolute left-0 right-0 ml-auto mr-auto place-self-center flex-1 circle-inner-oops-green z-20"></div>
              {/* Center Ping */}
              <div className="rounded-full w-6 h-6 absolute left-0 right-0 ml-auto mr-auto place-self-center flex-1 bg-success-normal animate-ping"></div>

              {/* Outside Ping */}
              <div
                className="absolute h-6 w-6 left-1/2 -top-[0.75rem]"
                style={{ transform: "translateX(-50%)" }}
              >
                <div className="relative flex">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-normal opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-6 w-6 bg-primary-normal"></span>
                </div>
              </div>

              {/* Distance Line Red */}
              <div className="absolute left-0 right-0 ml-auto mr-auto h-[2.5rem] w-0">
                <div className="h-full border-r-2 border-dotted border-primary-normal"></div>
              </div>
              {/* Distance Line Green */}
              <div className="absolute left-0 right-0 top-[2.5rem] ml-auto mr-auto h-1/3 w-0">
                <div className="h-full border-r-2 border-dotted border-success-normal"></div>
              </div>
              <h3 className="absolute left-[9.5rem] top-[4.5rem] text-black dark:text-white -rotate-90 whitespace-nowrap tracking-widest">{`> 5km`}</h3>
            </div>
          </div>
        </div>
      </InfoModalBackdrop>
    </>
  );
}
