export type IssueSearchResultType = {
  id: string;
  address: string;
  detailAddress?: string;
};

export type UserIssuanceResponseType = {
  hash: string;
  address: string;
  detailAddress?: string;
  issuanceAt: string;
  expiredAt: string;
}[];
