"use client";

import { RegistryIssuanceResponseType } from "@/app/_types";

const HistoryHashSection = ({
  registryIssuance,
}: {
  registryIssuance: RegistryIssuanceResponseType;
}) => {
  return (
    <div className="flex w-full flex-col items-center py-5">
      <div className="flex w-full flex-col gap-1">
        <h3 className="text-base font-bold sm:text-lg">주소</h3>
        <div className="text-sm sm:text-base">
          {`${registryIssuance.hashedDocument.address} ${registryIssuance.hashedDocument.detailAddress}`}
        </div>
      </div>
      <div className="mt-8 flex w-full flex-col gap-2">
        <h3 className="text-base font-bold sm:text-lg">
          표제부 ( 1동의 건물의 표시 )
        </h3>
        <div className="w-full whitespace-pre-wrap break-all text-center text-sm sm:text-base">
          {registryIssuance.hashedDocument.titleSection?.buildingDescription
            .length === 0 ? (
            <div>기록사항 없음</div>
          ) : (
            <>
              <div className="grid grid-cols-2 border-b border-zinc-200 py-2 sm:grid-cols-3 lg:grid-cols-9">
                <div>표시번호</div>
                <div className="lg:col-span-2">접수</div>
                <div className="lg:col-span-2">소재지번,건물명칭 및 번호</div>
                <div className="lg:col-span-2">건물내역</div>
                <div className="lg:col-span-2">등기원인 및 기타사항</div>
              </div>
              {registryIssuance.hashedDocument.titleSection?.buildingDescription.map(
                (item, index) => (
                  <div
                    key={item.displayNumber}
                    className="grid grid-cols-2 gap-2 border-b border-zinc-200 py-2 sm:grid-cols-3 lg:grid-cols-9"
                  >
                    <div className="">{item.displayNumber}</div>
                    <div className="lg:col-span-2">{item.receiptDate}</div>
                    <div className="lg:col-span-2">{item.locationNumber}</div>
                    <div className="lg:col-span-2">{item.buildingDetails}</div>
                    <div className="lg:col-span-2">
                      {item.registrationCause}
                    </div>
                  </div>
                ),
              )}
            </>
          )}
        </div>
      </div>
      <div className="mt-8 flex w-full flex-col gap-2">
        <h4 className="text-base font-bold sm:text-lg">
          표제부 ( 1동의 건물의 표시 ) - ( 대지권의 목적인 토지의 표시 )
        </h4>
        <div className="w-full whitespace-pre-wrap break-all text-center text-sm sm:text-base">
          {registryIssuance.hashedDocument.titleSection?.landDescription
            .length === 0 ? (
            <div>기록사항 없음</div>
          ) : (
            <>
              <div className="grid grid-cols-2 border-b border-zinc-200 py-2 sm:grid-cols-3 lg:grid-cols-9">
                <div>표시번호</div>
                <div className="lg:col-span-2">소재지번</div>
                <div className="lg:col-span-2">지목</div>
                <div className="lg:col-span-2">면적</div>
                <div className="lg:col-span-2">등기원인 및 기타사항</div>
              </div>
              {registryIssuance.hashedDocument.titleSection?.landDescription.map(
                (item, index) => (
                  <div
                    key={item.displayNumber}
                    className="grid grid-cols-2 gap-2 border-b border-zinc-200 py-2 sm:grid-cols-3 lg:grid-cols-9"
                  >
                    <div className="">{item.displayNumber}</div>
                    <div className="lg:col-span-2">{item.locationNumber}</div>
                    <div className="lg:col-span-2">{item.landType}</div>
                    <div className="lg:col-span-2">{item.area}</div>
                    <div className="lg:col-span-2">
                      {item.registrationCause}
                    </div>
                  </div>
                ),
              )}
            </>
          )}
        </div>
      </div>
      <div className="mt-8 flex w-full flex-col gap-2">
        <h3 className="text-base font-bold sm:text-lg">
          표제부 ( 전유부분의 건물의 표시 )
        </h3>
        <div className="w-full whitespace-pre-wrap break-all text-center text-sm sm:text-base">
          {registryIssuance.hashedDocument.exclusivePartDescription
            ?.buildingPartDescription.length === 0 ? (
            <div>기록사항 없음</div>
          ) : (
            <>
              <div className="grid grid-cols-2 border-b border-zinc-200 py-2 sm:grid-cols-3 lg:grid-cols-9">
                <div>표시번호</div>
                <div className="lg:col-span-2">접수</div>
                <div className="lg:col-span-2">건물번호</div>
                <div className="lg:col-span-2">건물내역</div>
                <div className="lg:col-span-2">등기원인 및 기타사항</div>
              </div>
              {registryIssuance.hashedDocument.exclusivePartDescription?.buildingPartDescription.map(
                (item, index) => (
                  <div
                    key={item.displayNumber}
                    className="grid grid-cols-2 gap-2 border-b border-zinc-200 py-2 sm:grid-cols-3 lg:grid-cols-9"
                  >
                    <div className="">{item.displayNumber}</div>
                    <div className="lg:col-span-2">{item.receiptDate}</div>
                    <div className="lg:col-span-2">{item.partNumber}</div>
                    <div className="lg:col-span-2">{item.buildingDetails}</div>
                    <div className="lg:col-span-2">
                      {item.registrationCause}
                    </div>
                  </div>
                ),
              )}
            </>
          )}
        </div>
      </div>
      <div className="mt-8 flex w-full flex-col gap-2">
        <h4 className="text-base font-bold sm:text-lg">
          표제부 ( 전유부분의 건물의 표시 ) - ( 대지권의 표시 )
        </h4>
        <div className="w-full whitespace-pre-wrap break-all text-center text-sm sm:text-base">
          {registryIssuance.hashedDocument.exclusivePartDescription
            ?.landRightDescription.length === 0 ? (
            <div>기록사항 없음</div>
          ) : (
            <>
              <div className="grid grid-cols-2 border-b border-zinc-200 py-2 sm:grid-cols-3 lg:grid-cols-7">
                <div>표시번호</div>
                <div className="lg:col-span-2">대지권종류</div>
                <div className="lg:col-span-2">대지권비율</div>
                <div className="lg:col-span-2">등기원인 및 기타사항</div>
              </div>
              {registryIssuance.hashedDocument.exclusivePartDescription?.landRightDescription.map(
                (item, index) => (
                  <div
                    key={item.displayNumber}
                    className="grid grid-cols-2 gap-2 border-b border-zinc-200 py-2 sm:grid-cols-3 lg:grid-cols-7"
                  >
                    <div className="">{item.displayNumber}</div>
                    <div className="lg:col-span-2">{item.landRightType}</div>
                    <div className="lg:col-span-2">{item.landRightRatio}</div>
                    <div className="lg:col-span-2">
                      {item.registrationCause}
                    </div>
                  </div>
                ),
              )}
            </>
          )}
        </div>
      </div>
      <div className="mt-8 flex w-full flex-col gap-2">
        <h3 className="text-base font-bold sm:text-lg">
          갑구 ( 소유권에 관한 사항 )
        </h3>
        <div className="w-full whitespace-pre-wrap break-all text-center text-sm sm:text-base">
          {registryIssuance.hashedDocument.firstSection?.length === 0 ? (
            <div>기록사항 없음</div>
          ) : (
            <>
              <div className="grid grid-cols-2 border-b border-zinc-200 py-2 sm:grid-cols-3 lg:grid-cols-9">
                <div>순위번호</div>
                <div className="lg:col-span-2">등기목적</div>
                <div className="lg:col-span-2">접수</div>
                <div className="lg:col-span-2">등기원인</div>
                <div className="lg:col-span-2">권리자 및 기타사항</div>
              </div>
              {registryIssuance.hashedDocument.firstSection?.map(
                (item, index) => (
                  <div
                    key={item.rankNumber}
                    className="grid grid-cols-2 gap-2 border-b border-zinc-200 py-2 sm:grid-cols-3 lg:grid-cols-9"
                  >
                    <div className="">{item.rankNumber}</div>
                    <div className="lg:col-span-2">
                      {item.registrationPurpose}
                    </div>
                    <div className="lg:col-span-2">{item.receiptDate}</div>
                    <div className="lg:col-span-2">
                      {item.registrationCause}
                    </div>
                    <div className="lg:col-span-2">
                      {item.holderAndAdditionalInfo}
                    </div>
                  </div>
                ),
              )}
            </>
          )}
        </div>
      </div>
      <div className="mt-8 flex w-full flex-col gap-2">
        <h3 className="text-base font-bold sm:text-lg">
          을구 ( 소유권 이외의 권리에 관한 사항 )
        </h3>
        <div className="w-full whitespace-pre-wrap break-all text-center text-sm sm:text-base">
          {registryIssuance.hashedDocument.secondSection?.length === 0 ? (
            <div>기록사항 없음</div>
          ) : (
            <>
              <div className="grid grid-cols-2 border-b border-zinc-200 py-2 sm:grid-cols-3 lg:grid-cols-9">
                <div>순위번호</div>
                <div className="lg:col-span-2">등기목적</div>
                <div className="lg:col-span-2">접수</div>
                <div className="lg:col-span-2">등기원인</div>
                <div className="lg:col-span-2">권리자 및 기타사항</div>
              </div>
              {registryIssuance.hashedDocument.secondSection?.map(
                (item, index) => (
                  <div
                    key={item.rankNumber}
                    className="grid grid-cols-2 gap-2 border-b border-zinc-200 py-2 sm:grid-cols-3 lg:grid-cols-9"
                  >
                    <div className="">{item.rankNumber}</div>
                    <div className="lg:col-span-2">
                      {item.registrationPurpose}
                    </div>
                    <div className="lg:col-span-2">{item.receiptDate}</div>
                    <div className="lg:col-span-2">
                      {item.registrationCause}
                    </div>
                    <div className="lg:col-span-2">
                      {item.holderAndAdditionalInfo}
                    </div>
                  </div>
                ),
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryHashSection;
