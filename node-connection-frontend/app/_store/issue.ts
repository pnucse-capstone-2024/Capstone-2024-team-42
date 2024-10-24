import { atom } from "jotai";
import { IssueSearchResultType } from "../_types";

export const issueSearchResultAtom = atom<
  IssueSearchResultType[] | null | undefined
>(undefined);
