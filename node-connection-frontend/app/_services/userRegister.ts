"use server";

import callApi from "../_utils/callApi";
import getSessionToken from "../_utils/getSessionToken";

type UserRegisterProps = {
  username: string;
  email: string;
  phoneNumber: string;
  courtCode?: string;
};

const userRegister = async ({
  username,
  email,
  phoneNumber,
  courtCode,
}: UserRegisterProps) => {
  const sessionToken = await getSessionToken();

  const res = await callApi({
    endpoint: "/user/register",
    method: "POST",
    token: sessionToken,
    body: {
      username,
      email,
      phoneNumber,
      courtCode: courtCode || null,
    },
  });

  console.log(res);

  return res;
};

export default userRegister;
