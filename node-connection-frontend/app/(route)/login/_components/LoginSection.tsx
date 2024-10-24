"use client";

import useInput from "@/app/_hooks/useInput";
import userLogin from "@/app/_services/userLogin";
import { errorToast } from "@/app/_utils/notifications";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginSection = () => {
  const router = useRouter();
  const [organization, setOrganization] = useState("ViewerMSP");
  const id = useInput({ input: "" });
  const password = useInput({ input: "" });

  const handleViewer = () => {
    if (organization === "ViewerMSP") return;
    setOrganization("ViewerMSP");
  };

  const handleRegistry = () => {
    if (organization === "RegistryMSP") return;
    setOrganization("RegistryMSP");
  };

  const handleLogin = async () => {
    await signIn("credentials", {
      organization,
      id: id.value,
      password: password.value,
      redirect: false,
    });

    const res = await userLogin();

    if (res.success) {
      router.push("/");
      router.refresh();
    } else {
      errorToast(res.error?.message || "알 수 없는 오류가 발생하였습니다.");
      await signOut({ redirect: false });
    }
  };

  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="my-4 flex flex-col">
      <div className="mb-1 border-b border-zinc-200 pb-3">
        <div className="flex gap-2">
          <button
            className={`mt-2 w-full rounded-lg py-3 transition-all duration-300 ${organization === "ViewerMSP" ? "cursor-default border border-blue-500 bg-blue-500 text-white" : "border border-zinc-200 bg-white text-black"}`}
            onClick={handleViewer}
            type="button"
          >
            개인
          </button>
          <button
            className={`mt-2 w-full rounded-lg py-3 transition-all duration-300 ${organization === "RegistryMSP" ? "cursor-default border border-blue-500 bg-blue-500 text-white" : "border border-zinc-200 bg-white text-black"}`}
            onClick={handleRegistry}
            type="button"
          >
            등기소
          </button>
        </div>
      </div>
      <input
        className="mt-2 w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 transition-all duration-300 focus:border-blue-500"
        placeholder="아이디"
        onChange={id.onChange}
        value={id.value}
        onKeyDown={(e) => handleEnter(e)}
        type="text"
      />
      <input
        className="mt-2 w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 transition-all duration-300 focus:border-blue-500"
        placeholder="비밀번호"
        onChange={password.onChange}
        value={password.value}
        onKeyDown={(e) => handleEnter(e)}
        type="password"
      />
      <button
        className={`mt-3 w-full rounded-lg py-3 text-white transition-all duration-300 ${!id.value || !password.value ? "cursor-not-allowed bg-zinc-400" : "bg-blue-500 hover:bg-blue-600"}`}
        disabled={!id.value || !password.value}
        onClick={handleLogin}
        type="button"
      >
        로그인
      </button>
      <div className="mx-auto mt-3 flex">
        <div>계정이 없으신가요?</div>
        <Link className="ml-2 font-bold underline" href="/join">
          회원가입
        </Link>
      </div>
    </div>
  );
};

export default LoginSection;
