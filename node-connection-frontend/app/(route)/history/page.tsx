import Navbar from "@/app/_components/Navbar";
import callApi from "@/app/_utils/callApi";
import getSessionToken from "@/app/_utils/getSessionToken";
import { UserIssuanceResponseType } from "@/app/_types";
import HistorySection from "./_components/HistorySection";

const HistoryPage = async () => {
  const sessionToken = await getSessionToken();

  const res = await callApi({
    endpoint: "/user/issuance",
    method: "GET",
    token: sessionToken,
  });

  return (
    <main className="h-full w-full">
      <Navbar />
      <div className="flex flex-col items-center px-3 xl:px-0">
        <div className="flex w-full max-w-[1248px] flex-col items-center justify-center">
          <div className="flex w-full flex-col items-center py-5">
            <h1 className="text-2xl font-bold md:text-3xl">발급내역 보기</h1>
            <h2 className="mt-3 text-base text-[#4E5968] md:text-lg">
              발급받은 부동산 등기사항증명서 내역을 확인할 수 있습니다.
            </h2>
          </div>
          <HistorySection
            issuances={res.contents as UserIssuanceResponseType}
          />
        </div>
      </div>
    </main>
  );
};

export default HistoryPage;
