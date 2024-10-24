"use client";

import useInput from "@/app/_hooks/useInput";
import registryIssuance from "@/app/_services/registryIssuance";
import { errorToast } from "@/app/_utils/notifications";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Address, useDaumPostcodePopup } from "react-daum-postcode";

const VerifySection = () => {
  const router = useRouter();
  const [baseAddress, setBaseAddress] = useState("");
  const hash = useInput({ input: "" });

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
    hash.setValue("");
  };

  const handleSubmit = async () => {
    if (!baseAddress) {
      errorToast("주소를 입력해주세요.");
      return;
    }
    if (hash.value === "") {
      errorToast("검증 해시를 입력해주세요.");
      return;
    }

    const res = await registryIssuance({
      address: baseAddress,
      hash: hash.value,
    });

    if (!res.success) {
      errorToast("존재하지 않는 등기입니다.");
      return;
    }

    router.push(`/verify/${hash.value}?address=${baseAddress}`);
  };

  return (
    <div className="flex w-full flex-col items-center py-5">
      <div className="flex w-full flex-col">
        <h3 className="mb-2 text-lg font-bold">주소</h3>
        {baseAddress ? (
          <div className="w-full rounded-lg bg-zinc-200 px-4 py-3 text-black">
            {baseAddress}
          </div>
        ) : (
          <button
            className="w-full rounded-lg bg-blue-500 py-3 text-white transition-all duration-300 hover:bg-blue-600"
            onClick={handleAddressSearch}
            type="button"
          >
            주소 찾기
          </button>
        )}
        <h3 className="mb-2 mt-4 text-lg font-bold">검증 해시</h3>
        <input
          className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-3"
          placeholder="검증 해시"
          onChange={hash.onChange}
          value={hash.value}
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
            검증하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifySection;
