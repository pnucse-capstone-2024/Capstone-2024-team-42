"use server";

import callApi from "../_utils/callApi";
import getSessionToken from "../_utils/getSessionToken";

type RegistryGIssuanceProps = {
  address: string;
  hash: string;
};

const registryIssuance = async ({ address, hash }: RegistryGIssuanceProps) => {
  const sessionToken = await getSessionToken();

  const res = await callApi({
    endpoint: "/registry/issuance",
    method: "GET",
    token: sessionToken,
    params: {
      address,
      hash,
    },
  });

  console.log(res);

  return res;
};

export default registryIssuance;
