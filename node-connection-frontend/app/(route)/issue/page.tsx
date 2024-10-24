import Navbar from "@/app/_components/Navbar";
import IssueSection from "./_components/IssueSection";
import IssueSearchResultSection from "./_components/IssueSearchResultSection";

const IssuePage = () => {
  return (
    <main className="h-full w-full">
      <Navbar />
      <div className="flex flex-col items-center px-3 xl:px-0">
        <div className="flex w-full max-w-[1248px] flex-col items-center justify-center">
          <div className="flex w-full flex-col items-center border-b border-zinc-200 py-5">
            <h1 className="text-2xl font-bold md:text-3xl">발급하기</h1>
            <h2 className="mt-3 text-base text-[#4E5968] md:text-lg">
              주소 검색 후 부동산 등기사항증명서를 발급할 수 있습니다.
            </h2>
          </div>
          <IssueSection />
          <IssueSearchResultSection />
        </div>
      </div>
    </main>
  );
};

export default IssuePage;
