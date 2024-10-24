"use server";

import { SecondSectionType } from "../_types";
import callApi from "../_utils/callApi";
import getSessionToken from "../_utils/getSessionToken";

type courtSecondProps = {
  id: string;
  address: string;
  secondSection: SecondSectionType;
};

const courtSecond = async ({
  id,
  address,
  secondSection,
}: courtSecondProps) => {
  const sessionToken = await getSessionToken();

  const res = await callApi({
    endpoint: `/court/${id}/second`,
    method: "PATCH",
    token: sessionToken,
    body: { address, ...secondSection },
  });

  console.log(res);

  return res;
};

export default courtSecond;
