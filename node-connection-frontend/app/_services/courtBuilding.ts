"use server";

import { BuildingDescriptionType } from "../_types";
import callApi from "../_utils/callApi";
import getSessionToken from "../_utils/getSessionToken";

type courtBuildingProps = {
  id: string;
  address: string;
  buildingDescription: BuildingDescriptionType;
};

const courtBuilding = async ({
  id,
  address,
  buildingDescription,
}: courtBuildingProps) => {
  const sessionToken = await getSessionToken();

  const res = await callApi({
    endpoint: `/court/${id}/title/building-description`,
    method: "PATCH",
    token: sessionToken,
    body: { address, ...buildingDescription },
  });

  console.log(res);

  return res;
};

export default courtBuilding;
