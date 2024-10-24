"use server";

const getSessionToken = async () => {
  if (typeof window === "undefined") {
    const c = (await import("next/headers")).cookies();
    const sessionToken =
      c.get("next-auth.session-token")?.value ||
      c.get("__Secure-next-auth.session-token")?.value;
    return sessionToken || "";
  }
  return "";
};

export default getSessionToken;
