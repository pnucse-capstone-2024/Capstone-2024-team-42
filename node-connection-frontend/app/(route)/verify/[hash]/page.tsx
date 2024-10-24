import Navbar from "@/app/_components/Navbar";
import callApi from "@/app/_utils/callApi";
import getSessionToken from "@/app/_utils/getSessionToken";
import { RegistryIssuanceResponseType } from "@/app/_types";
import { redirect } from "next/navigation";
import VerifyHashSection from "./_components/VerifyHashSection";
import VerifyHashInfoSection from "./_components/VerifyHashInfoSection";

type VerifyHashPageProps = {
  params: { hash: string };
  searchParams?: { [key: string]: string | undefined };
};

const VerifyHashPage = async ({
  params,
  searchParams,
}: VerifyHashPageProps) => {
  const sessionToken = await getSessionToken();

  const res = await callApi({
    endpoint: "/registry/issuance",
    method: "GET",
    token: sessionToken,
    params: {
      address: searchParams?.address as string,
      hash: params.hash,
    },
  });

  if (!res.success) {
    redirect("/verify");
  }

  return (
    <main className="h-full w-full">
      <Navbar />
      <div className="flex flex-col items-center px-3 xl:px-0">
        <div className="flex w-full max-w-[1248px] flex-col items-center justify-center">
          <div className="flex w-full flex-col items-center py-5">
            <h2 className="text-2xl font-bold md:text-3xl">검증 정보</h2>
          </div>
          <VerifyHashInfoSection
            hash={params.hash}
            registryIssuance={res.contents as RegistryIssuanceResponseType}
          />
          <div className="flex w-full flex-col items-center border-t border-zinc-200 py-5">
            <h1 className="text-2xl font-bold md:text-3xl">
              등기사항전부증명서(말소사항 포함)
            </h1>
            <h2 className="mt-3 text-base text-[#4E5968] md:text-lg">
              <b className="bg-green-100/80 font-bold">연두색 배경</b>
              으로 표시된 항목은 발급 당시에는 없었던 새로운 항목입니다. 검증에
              활용하시기 바랍니다.
            </h2>
          </div>
          <VerifyHashSection
            registryIssuance={res.contents as RegistryIssuanceResponseType}
          />
        </div>
      </div>
    </main>
  );
};

export default VerifyHashPage;
