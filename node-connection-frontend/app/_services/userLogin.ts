"use server";

import callApi from "../_utils/callApi";
import getSessionToken from "../_utils/getSessionToken";

const userLogin = async () => {
  const sessionToken = await getSessionToken();

  const res = await callApi({
    endpoint: "/user/login",
    method: "POST",
    token: sessionToken,
  });

  console.log(res);

  return res;
};

export default userLogin;
