"use client";

import useInput from "@/app/_hooks/useInput";
import registryGet from "@/app/_services/registryGet";
import { issueSearchResultAtom } from "@/app/_store";
import { RegistryResponseType } from "@/app/_types";
import { errorToast } from "@/app/_utils/notifications";
import { useSetAtom } from "jotai";
import { useState } from "react";
import { useDaumPostcodePopup, Address } from "react-daum-postcode";

const IssueSection = () => {
  const setIssueSearchResult = useSetAtom(issueSearchResultAtom);
  const [baseAddress, setBaseAddress] = useState("");
  const detailAddress = useInput({ input: "" });

  const open = useDaumPostcodePopup();

  const handleComplete = (data: Address) => {
    let fullAddress = data.autoJibunAddress || data.jibunAddress;
    let extraAddress = "";

    if (data.addressType === "R" || data.addressType === "J") {
      if (data.buildingName !== "") {
        extraAddress = data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` ${extraAddress}` : "";
    }

    setBaseAddress(fullAddress);
  };

  const handleAddressSearch = async () => {
    await open({ onComplete: handleComplete });
  };

  const handleReset = () => {
    setBaseAddress("");
    detailAddress.setValue("");
    setIssueSearchResult(undefined);
  };

  const handleSubmit = async () => {
    const res = await registryGet({
      address: baseAddress,
      detailAddress: detailAddress.value,
    });

    if (res.error) {
      if (res.error?.message === "JSON 파싱 에러 발생") {
        setIssueSearchResult(null);
        return;
      }

      errorToast(res.error.message || "에러가 발생했습니다.");
    }

    const data = res.contents as RegistryResponseType;
    if (data.length === 0) {
      setIssueSearchResult(null);
      return;
    }

    setIssueSearchResult(
      data.map((item) => ({
        id: item.id,
        address: item.address,
        detailAddress: item.detailAddress,
      })),
    );
  };

  return (
    <div className="flex w-full flex-col items-center py-5">
      <div className="flex w-full flex-col">
        <h3 className="mb-2 text-lg font-bold">주소 검색</h3>
        {baseAddress ? (
          <>
            <div className="w-full rounded-lg bg-zinc-200 px-4 py-3 text-black">
              {baseAddress}
            </div>
            <input
              className="mt-2 w-full rounded-lg border border-zinc-200 bg-white px-4 py-3"
              placeholder="상세주소"
              onChange={detailAddress.onChange}
              value={detailAddress.value}
              type="text"
            />
            <div className="flex gap-2">
              <button
                className="mt-2 w-full rounded-lg bg-zinc-200 py-3 text-black"
                onClick={handleReset}
                type="button"
              >
                재설정
              </button>
              <button
                className="mt-2 w-full rounded-lg bg-blue-500 py-3 text-white"
                onClick={handleSubmit}
                type="button"
              >
                검색
              </button>
            </div>
          </>
        ) : (
          <button
            className="w-full rounded-lg bg-blue-500 py-3 text-white transition-all duration-300 hover:bg-blue-600"
            onClick={handleAddressSearch}
            type="button"
          >
            주소 찾기
          </button>
        )}
      </div>
    </div>
  );
};

export default IssueSection;
