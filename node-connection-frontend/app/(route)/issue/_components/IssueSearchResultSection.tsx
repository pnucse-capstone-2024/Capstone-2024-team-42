"use client";

import { issueSearchResultAtom } from "@/app/_store";
import { useAtomValue } from "jotai";
import IssueSearchResultTable from "./IssueSearchResultTable";

const IssueSearchResultSection = () => {
  const issueSearchResult = useAtomValue(issueSearchResultAtom);

  return (
    issueSearchResult !== undefined && (
      <div className="flex w-full flex-col items-center border-t border-zinc-200 py-5">
        <div className="flex w-full flex-col">
          <h3 className="mb-2 text-lg font-bold">검색 결과</h3>
          {issueSearchResult ? (
            <IssueSearchResultTable issueSearchResult={issueSearchResult} />
          ) : (
            <div className="text-center">검색 결과가 없습니다.</div>
          )}
        </div>
      </div>
    )
  );
};

export default IssueSearchResultSection;
