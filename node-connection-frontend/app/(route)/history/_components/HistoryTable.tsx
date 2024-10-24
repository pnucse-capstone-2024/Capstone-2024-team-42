"use client";

import { UserIssuanceResponseType } from "@/app/_types";
import { useRouter } from "next/navigation";

const HistroyTable = ({
  issuances,
}: {
  issuances?: UserIssuanceResponseType;
}) => {
  const router = useRouter();

  const handleIssuance = (issuance: {
    hash: string;
    address: string;
    detailAddress?: string;
    issuanceAt: string;
    expiredAt: string;
  }) => {
    router.push(`/history/${issuance.hash}?address=${issuance.address}`);
  };

  return (
    <div className="w-full whitespace-pre-wrap break-all text-center text-sm sm:text-base">
      <div className="grid border-b border-zinc-200 py-2 sm:grid-cols-6">
        <div className="sm:col-span-2">발급일시</div>
        <div className="sm:col-span-3">부동산 주소</div>
        <div />
      </div>
      {issuances
        ?.sort(
          (a, b) =>
            new Date(b.issuanceAt).getTime() - new Date(a.issuanceAt).getTime(),
        )
        .map((issuance) => (
          <div
            key={issuance.hash}
            className="grid items-center border-b border-zinc-200 py-2 sm:grid-cols-6"
          >
            <div className="break-all py-1 sm:col-span-2">
              {new Date(issuance.issuanceAt).toLocaleString("ko-KR")}
            </div>
            <div className="py-1 sm:col-span-3">{`${issuance.address} ${issuance.detailAddress}`}</div>
            <div className="flex py-1">
              <button
                className="m-auto w-full max-w-24 rounded-lg bg-blue-500 py-2 text-white transition-all duration-300 hover:bg-blue-600"
                onClick={() => handleIssuance(issuance)}
                type="button"
              >
                조회
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default HistroyTable;
