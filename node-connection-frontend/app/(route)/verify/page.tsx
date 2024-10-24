import Navbar from "@/app/_components/Navbar";
import VerifySection from "./_components/VerifySection";

const RegistrationPage = () => {
  return (
    <main className="h-full w-full">
      <Navbar />
      <div className="flex flex-col items-center px-3 xl:px-0">
        <div className="flex w-full max-w-[1248px] flex-col items-center justify-center">
          <div className="flex w-full flex-col items-center border-b border-zinc-200 py-5">
            <h1 className="text-2xl font-bold md:text-3xl">등기 검증하기</h1>
            <h2 className="mt-3 text-base text-[#4E5968] md:text-lg">
              발급받은 부동산 등기사항증명서를 검증할 수 있습니다.
            </h2>
          </div>
          <VerifySection />
        </div>
      </div>
    </main>
  );
};

export default RegistrationPage;
