import MainSection from "./_components/MainSection";
import Navbar from "./_components/Navbar";

const Home = () => {
  return (
    <main className="h-full w-full">
      <Navbar />
      <div className="flex flex-col items-center px-3 xl:px-0">
        <div className="flex w-full max-w-[1248px] flex-col items-center justify-center">
          <div className="flex w-full flex-col items-center py-5">
            <h1 className="text-2xl font-bold md:text-3xl">node-connection</h1>
            <h2 className="mt-3 text-base text-[#4E5968] md:text-lg">
              블록체인 기반 부동산 등기사항증명서 발급 시스템
            </h2>
          </div>
          <MainSection />
        </div>
      </div>
    </main>
  );
};

export default Home;
