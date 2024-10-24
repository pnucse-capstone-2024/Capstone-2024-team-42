import Navbar from "@/app/_components/Navbar";
import RegistrationSection from "./_components/RegistrationSection";

const RegistrationPage = () => {
  return (
    <main className="h-full w-full">
      <Navbar />
      <div className="flex flex-col items-center px-3 xl:px-0">
        <div className="flex w-full max-w-[1248px] flex-col items-center justify-center">
          <div className="flex w-full flex-col items-center border-b border-zinc-200 py-5">
            <h1 className="text-2xl font-bold md:text-3xl">등기 관리</h1>
            <h2 className="mt-3 text-base text-[#4E5968] md:text-lg">
              부동산 등기사항증명서 관리 페이지입니다.
            </h2>
          </div>
          <RegistrationSection />
        </div>
      </div>
    </main>
  );
};

export default RegistrationPage;
