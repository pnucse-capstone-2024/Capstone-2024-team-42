import Navbar from "@/app/_components/Navbar";
import callApi from "@/app/_utils/callApi";
import getSessionToken from "@/app/_utils/getSessionToken";
import { RegistryIssuanceResponseType } from "@/app/_types";
import { redirect } from "next/navigation";
import HistoryHashSection from "./_components/HistoryHashSection";
import HistoryHashInfoSection from "./_components/HistoryHashInfoSection";

type HistoryHashPageProps = {
  params: { hash: string };
  searchParams?: { [key: string]: string | undefined };
};

const HistoryHashPage = async ({
  params,
  searchParams,
}: HistoryHashPageProps) => {
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
    redirect("/history");
  }

  return (
    <main className="h-full w-full">
      <Navbar />
      <div className="flex flex-col items-center px-3 xl:px-0">
        <div className="flex w-full max-w-[1248px] flex-col items-center justify-center">
          <div className="flex w-full flex-col items-center py-5">
            <h2 className="text-2xl font-bold md:text-3xl">발급 정보</h2>
          </div>
          <HistoryHashInfoSection
            hash={params.hash}
            registryIssuance={res.contents as RegistryIssuanceResponseType}
          />
          <div className="flex w-full flex-col items-center border-t border-zinc-200 py-5">
            <h1 className="text-2xl font-bold md:text-3xl">
              등기사항전부증명서(말소사항 포함)
            </h1>
          </div>
          <HistoryHashSection
            registryIssuance={res.contents as RegistryIssuanceResponseType}
          />
        </div>
      </div>
    </main>
  );
};

export default HistoryHashPage;
