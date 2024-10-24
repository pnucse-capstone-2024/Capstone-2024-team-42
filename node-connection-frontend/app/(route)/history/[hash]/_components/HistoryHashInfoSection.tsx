"use client";

import { RegistryIssuanceResponseType } from "@/app/_types";
import { QRCodeCanvas } from "qrcode.react";
import { useMemo, useState } from "react";

const HistoryHashInfoSection = ({
  hash,
  registryIssuance,
}: {
  hash: string;
  registryIssuance: RegistryIssuanceResponseType;
}) => {
  const [QRValue, setQRValue] = useState<string>("");
  useMemo(() => {
    if (typeof window !== "undefined") {
      setQRValue(
        `${window.location.origin}/verify/${hash}?address=${registryIssuance.hashedDocument.address}`,
      );
    }
  }, []);

  return (
    <div className="flex w-full flex-col items-center py-5">
      <div className="flex w-full flex-col gap-1 sm:flex-row">
        <h3 className="text-sm font-bold sm:text-base">검증 해시</h3>
        <div className="break-all text-sm sm:text-base">{hash}</div>
      </div>
      <div className="flex w-full flex-col gap-1 sm:flex-row">
        <h3 className="text-sm font-bold sm:text-base">부동산 ID</h3>
        <div className="break-all text-sm sm:text-base">
          {registryIssuance.hashedDocument.id}
        </div>
      </div>
      <div className="flex w-full flex-col gap-1 sm:flex-row">
        <h3 className="text-sm font-bold sm:text-base">트랜잭션 ID</h3>
        <div className="break-all text-sm sm:text-base">
          {registryIssuance.txId}
        </div>
      </div>
      <div className="flex w-full flex-col gap-1 sm:flex-row">
        <h3 className="text-sm font-bold sm:text-base">발급자</h3>
        <div className="text-sm sm:text-base">{registryIssuance.issuer}</div>
      </div>
      <div className="flex w-full flex-col gap-1 sm:flex-row">
        <h3 className="text-sm font-bold sm:text-base">발급일</h3>
        <div className="text-sm sm:text-base">
          {new Date(registryIssuance.issuanceAt).toLocaleString("ko-KR")}
        </div>
      </div>
      <div className="flex w-full flex-col gap-1 sm:flex-row">
        <h3 className="text-sm font-bold sm:text-base">만료일</h3>
        <div className="text-sm sm:text-base">
          {new Date(registryIssuance.expiredAt).toLocaleString("ko-KR")}
        </div>
      </div>
      <div className="flex w-full flex-col gap-1">
        <h3 className="text-sm font-bold sm:text-base">검증 QR</h3>
        <div>
          <QRCodeCanvas value={QRValue} size={128} />
        </div>
        <div className="text-xs text-zinc-700 sm:text-sm">
          위 QR코드 링크로 접속하시면 등기사항증명서를 검증할 수 있습니다.
        </div>
      </div>
    </div>
  );
};

export default HistoryHashInfoSection;
