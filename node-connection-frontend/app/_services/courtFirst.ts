"use server";

import { FirstSectionType } from "../_types";
import callApi from "../_utils/callApi";
import getSessionToken from "../_utils/getSessionToken";

type courtFirstProps = {
  id: string;
  address: string;
  firstSection: FirstSectionType;
};

const courtFirst = async ({ id, address, firstSection }: courtFirstProps) => {
  const sessionToken = await getSessionToken();

  const res = await callApi({
    endpoint: `/court/${id}/first`,
    method: "PATCH",
    token: sessionToken,
    body: { address, ...firstSection },
  });

  console.log(res);

  return res;
};

export default courtFirst;
