"use server";

import { LandDescriptionType } from "../_types";
import callApi from "../_utils/callApi";
import getSessionToken from "../_utils/getSessionToken";

type courtLandProps = {
  id: string;
  address: string;
  landDescription: LandDescriptionType;
};

const courtLand = async ({ id, address, landDescription }: courtLandProps) => {
  const sessionToken = await getSessionToken();

  const res = await callApi({
    endpoint: `/court/${id}/title/land-description`,
    method: "PATCH",
    token: sessionToken,
    body: { address, ...landDescription },
  });

  console.log(res);

  return res;
};

export default courtLand;
