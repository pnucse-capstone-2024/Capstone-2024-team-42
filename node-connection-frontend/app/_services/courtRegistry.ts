"use server";

import {
  BuildingDescriptionType,
  BuildingPartDescriptionType,
  FirstSectionType,
  LandDescriptionType,
  LandRightDescriptionType,
  SecondSectionType,
} from "../_types";
import callApi from "../_utils/callApi";
import getSessionToken from "../_utils/getSessionToken";

type courtRegistryProps = {
  address: string;
  detailAddress: string;
  titleSection?: {
    buildingDescription: BuildingDescriptionType[];
    landDescription: LandDescriptionType[];
  };
  exclusivePartDescription?: {
    buildingPartDescription: BuildingPartDescriptionType[];
    landRightDescription: LandRightDescriptionType[];
  };
  firstSection?: FirstSectionType[];
  secondSection?: SecondSectionType[];
};

const courtRegistry = async ({
  address,
  detailAddress,
  titleSection,
  exclusivePartDescription,
  firstSection,
  secondSection,
}: courtRegistryProps) => {
  const sessionToken = await getSessionToken();

  const res = await callApi({
    endpoint: "/court/registry",
    method: "POST",
    token: sessionToken,
    body: {
      address,
      detailAddress,
      titleSection,
      exclusivePartDescription,
      firstSection,
      secondSection,
    },
  });

  console.log(res);

  return res;
};

export default courtRegistry;
