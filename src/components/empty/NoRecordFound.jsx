// Assets
import EmptyRecord from "../../assets/icons/empty-record.svg";

export default function NoRecordFound({ children }) {
  return (
    <div className="flex flex-col justify-center align-middle items-center h-full gap-4 my-8 animate__animated animate__zoomIn animate__faster">
      <img src={EmptyRecord} alt="Empty record" className="" />
      {children}
    </div>
  );
}
