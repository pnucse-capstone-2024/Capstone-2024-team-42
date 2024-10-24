/* eslint-disable jsx-a11y/control-has-associated-label */

import userIssuance from "@/app/_services/userIssuance";
import { IssueSearchResultType } from "@/app/_types";
import { errorToast, successToast } from "@/app/_utils/notifications";
import { useRouter } from "next/navigation";

const IssueSearchResultTable = ({
  issueSearchResult,
}: {
  issueSearchResult: IssueSearchResultType[];
}) => {
  const router = useRouter();

  const handleIssuance = async (result: IssueSearchResultType) => {
    const res = await userIssuance({
      address: result.address,
      detailAddress: result.detailAddress,
    });

    if (res.error) {
      errorToast(res.error?.message || "발급에 실패했습니다.");
    }

    const hash = res.contents as string;

    successToast("발급에 성공했습니다.");
    router.push(`/history/${hash}?address=${result.address}`);
    router.refresh();
  };

  return (
    <div className="w-full whitespace-pre-wrap break-all text-center">
      <div className="grid border-b border-zinc-200 py-2 sm:grid-cols-7">
        <div className="sm:col-span-3">부동산 ID</div>
        <div className="sm:col-span-3">부동산 주소</div>
        <div />
      </div>
      {issueSearchResult.map((result) => (
        <div
          key={result.id}
          className="grid items-center border-b border-zinc-200 py-2 sm:grid-cols-7"
        >
          <div className="break-all py-1 sm:col-span-3">{result.id}</div>
          <div className="py-1 sm:col-span-3">{`${result.address} ${result.detailAddress}`}</div>
          <div className="flex py-1">
            <button
              className="m-auto w-full max-w-24 rounded-lg bg-blue-500 py-2 text-white transition-all duration-300 hover:bg-blue-600"
              onClick={() => handleIssuance(result)}
              type="button"
            >
              발급
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IssueSearchResultTable;
