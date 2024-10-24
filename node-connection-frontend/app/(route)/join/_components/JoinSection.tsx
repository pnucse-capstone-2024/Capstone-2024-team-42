"use client";

import useInput from "@/app/_hooks/useInput";
import userRegister from "@/app/_services/userRegister";
import { errorToast, successToast } from "@/app/_utils/notifications";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const JoinSection = () => {
  const router = useRouter();
  const [isFilled, setIsFilled] = useState(false);
  const [organization, setOrganization] = useState("ViewerMSP");
  const courtCode = useInput({ input: "" });
  const id = useInput({ input: "" });
  const password = useInput({ input: "" });
  const passwordConfirm = useInput({ input: "" });
  const username = useInput({ input: "" });
  const email = useInput({ input: "" });
  const phoneNumber = useInput({ input: "", regex: /^[0-9\b -]{0,13}$/ });

  useEffect(() => {
    if (phoneNumber.value.length === 10) {
      phoneNumber.setValue(
        phoneNumber.value.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"),
      );
    }
    if (phoneNumber.value.length === 13) {
      phoneNumber.setValue(
        phoneNumber.value
          .replace(/-/g, "")
          .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"),
      );
    }
  }, [phoneNumber.value]);

  useEffect(() => {
    const requiredFields = [
      id.value,
      password.value,
      passwordConfirm.value,
      username.value,
      email.value,
      phoneNumber.value,
    ];
    if (organization === "RegistryMSP") {
      requiredFields.push(courtCode.value);
    }
    setIsFilled(requiredFields.every(Boolean));
  }, [
    organization,
    courtCode.value,
    id.value,
    password.value,
    passwordConfirm.value,
    username.value,
    email.value,
    phoneNumber.value,
  ]);

  const handleViewer = () => {
    if (organization === "ViewerMSP") return;
    setOrganization("ViewerMSP");
  };

  const handleRegistry = () => {
    if (organization === "RegistryMSP") return;
    setOrganization("RegistryMSP");
  };

  const handleJoin = async () => {
    if (password.value !== passwordConfirm.value) {
      errorToast("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value)) {
      errorToast("올바른 이메일 형식을 입력해주세요.");
      return;
    }
    if (phoneNumber.value.length !== 13) {
      errorToast("올바른 전화번호를 입력해주세요.");
      return;
    }

    await signIn("credentials", {
      organization,
      id: id.value,
      password: password.value,
      redirect: false,
    });

    const res = await userRegister({
      username: username.value,
      email: email.value,
      phoneNumber: phoneNumber.value,
      courtCode: organization === "RegistryMSP" ? courtCode.value : undefined,
    });

    if (res.success) {
      successToast("회원가입이 완료되었습니다.");
      router.push("/");
      router.refresh();
    } else {
      errorToast(res.error?.message || "알 수 없는 오류가 발생하였습니다.");
      await signOut({ redirect: false });
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
        {organization === "RegistryMSP" && (
          <input
            className="mt-2 w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 transition-all duration-300 focus:border-blue-500"
            placeholder="등기소 인증코드"
            onChange={courtCode.onChange}
            value={courtCode.value}
            type="text"
          />
        )}
      </div>
      <div className="mb-1 border-b border-zinc-200 pb-3">
        <input
          className="mt-2 w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 transition-all duration-300 focus:border-blue-500"
          placeholder="아이디"
          onChange={id.onChange}
          value={id.value}
          type="text"
        />
        <input
          className="mt-2 w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 transition-all duration-300 focus:border-blue-500"
          placeholder="비밀번호"
          onChange={password.onChange}
          value={password.value}
          type="password"
        />
        <input
          className="mt-2 w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 transition-all duration-300 focus:border-blue-500"
          placeholder="비밀번호 확인"
          onChange={passwordConfirm.onChange}
          value={passwordConfirm.value}
          type="password"
        />
      </div>
      <input
        className="mt-2 w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 transition-all duration-300 focus:border-blue-500"
        placeholder="이름"
        onChange={username.onChange}
        value={username.value}
        type="text"
      />
      <input
        className="mt-2 w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 transition-all duration-300 focus:border-blue-500"
        placeholder="이메일"
        onChange={email.onChange}
        value={email.value}
        type="text"
      />
      <input
        className="mt-2 w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 transition-all duration-300 focus:border-blue-500"
        placeholder="전화번호"
        onChange={phoneNumber.onChange}
        value={phoneNumber.value}
        type="text"
      />
      <button
        className={`mt-3 w-full rounded-lg py-3 text-white transition-all duration-300 ${!isFilled ? "cursor-not-allowed bg-zinc-400" : "bg-blue-500 hover:bg-blue-600"}`}
        disabled={!isFilled}
        onClick={handleJoin}
        type="button"
      >
        회원가입
      </button>
    </div>
  );
};

export default JoinSection;
