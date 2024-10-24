"use server";

import { LandRightDescriptionType } from "../_types";
import callApi from "../_utils/callApi";
import getSessionToken from "../_utils/getSessionToken";

type courtLandRightProps = {
  id: string;
  address: string;
  landRightDescription: LandRightDescriptionType;
};

const courtLandRight = async ({
  id,
  address,
  landRightDescription,
}: courtLandRightProps) => {
  const sessionToken = await getSessionToken();

  const res = await callApi({
    endpoint: `/court/${id}/exclusive/land-rights`,
    method: "PATCH",
    token: sessionToken,
    body: { address, ...landRightDescription },
  });

  console.log(res);

  return res;
};

export default courtLandRight;
