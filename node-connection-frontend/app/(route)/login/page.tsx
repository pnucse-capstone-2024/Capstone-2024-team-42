import getSessionToken from "@/app/_utils/getSessionToken";
import { redirect } from "next/navigation";
import LoginSection from "./_components/LoginSection";

const LoginPage = async () => {
  const sessionToken = await getSessionToken();
  if (sessionToken) {
    redirect("/");
  }

  return (
    <main className="flex h-screen w-full items-center justify-center">
      <div className="fixed left-1/2 top-1/2 flex w-full max-w-[500px] -translate-x-1/2 -translate-y-1/2 p-6">
        <div className="mx-auto flex w-full flex-col">
          <div className="mx-auto text-2xl font-bold">node-connection</div>
          <div className="mx-auto text-zinc-700">
            블록체인 기반 부동산 등기사항증명서 발급 시스템
          </div>
          <LoginSection />
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
