"use server";

import { BuildingPartDescriptionType } from "../_types";
import callApi from "../_utils/callApi";
import getSessionToken from "../_utils/getSessionToken";

type courtBuildingPartProps = {
  id: string;
  address: string;
  buildingPartDescription: BuildingPartDescriptionType;
};

const courtBuildingPart = async ({
  id,
  address,
  buildingPartDescription,
}: courtBuildingPartProps) => {
  const sessionToken = await getSessionToken();

  const res = await callApi({
    endpoint: `/court/${id}/exclusive/building-description`,
    method: "PATCH",
    token: sessionToken,
    body: { address, ...buildingPartDescription },
  });

  console.log(res);

  return res;
};

export default courtBuildingPart;
