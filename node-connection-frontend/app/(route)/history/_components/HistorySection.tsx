import { UserIssuanceResponseType } from "@/app/_types";
import HistoryTable from "./HistoryTable";

const HistorySection = ({
  issuances,
}: {
  issuances?: UserIssuanceResponseType;
}) => {
  return (
    <div className="flex w-full flex-col items-center py-5">
      <div className="flex w-full flex-col">
        {issuances ? (
          <HistoryTable issuances={issuances} />
        ) : (
          <div className="text-center">발급 내역이 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default HistorySection;
