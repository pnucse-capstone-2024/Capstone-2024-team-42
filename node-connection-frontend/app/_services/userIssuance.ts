"use server";

import callApi from "../_utils/callApi";
import getSessionToken from "../_utils/getSessionToken";

type UserIssuanceProps = {
  address: string;
  detailAddress?: string;
};

const userIssuance = async ({ address, detailAddress }: UserIssuanceProps) => {
  const sessionToken = await getSessionToken();

  const res = await callApi({
    endpoint: "/user/issuance",
    method: "POST",
    token: sessionToken,
    body: {
      address,
      detailAddress: detailAddress || null,
    },
  });

  console.log(res);

  return res;
};

export default userIssuance;
