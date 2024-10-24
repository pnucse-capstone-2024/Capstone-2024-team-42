"use server";

import callApi from "../_utils/callApi";
import getSessionToken from "../_utils/getSessionToken";

type RegistryGetProps = {
  address: string;
  detailAddress: string;
};

const registryGet = async ({ address, detailAddress }: RegistryGetProps) => {
  const sessionToken = await getSessionToken();

  const res = await callApi({
    endpoint: "/registry",
    method: "GET",
    token: sessionToken,
    params: {
      address,
      detailAddress,
    },
  });

  console.log(res);

  return res;
};

export default registryGet;
