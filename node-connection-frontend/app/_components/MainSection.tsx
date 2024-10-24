/* eslint-disable no-nested-ternary */

"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const MainSection = () => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div className="mt-10 flex w-full">
      {session ? (
        session?.organization === "ViewerMSP" ? (
          <div className="flex w-full flex-col gap-3 md:flex-row">
            <Link
              className="flex w-full flex-col rounded-xl bg-zinc-100 p-4 text-black transition-all duration-300 hover:bg-zinc-200 md:p-6"
              href="/issue"
            >
              <div className="mr-auto text-xl font-medium md:text-2xl">
                발급하기
              </div>
              <div className="mt-8 text-base md:mt-12">
                주소 검색 후 부동산 등기사항증명서를 발급할 수 있습니다.
              </div>
            </Link>
            <Link
              className="flex w-full flex-col rounded-xl bg-zinc-100 p-4 text-black transition-all duration-300 hover:bg-zinc-200 md:p-6"
              href="/history"
            >
              <div className="mr-auto text-xl font-medium md:text-2xl">
                발급내역 보기
              </div>
              <div className="mt-8 text-base md:mt-12">
                발급받은 부동산 등기사항증명서 내역을 확인할 수 있습니다.
              </div>
            </Link>
            <Link
              className="flex w-full flex-col rounded-xl bg-zinc-100 p-4 text-black transition-all duration-300 hover:bg-zinc-200 md:p-6"
              href="/verify"
            >
              <div className="mr-auto text-xl font-medium md:text-2xl">
                등기 검증하기
              </div>
              <div className="mt-8 text-base md:mt-12">
                발급받은 부동산 등기사항증명서를 검증할 수 있습니다.
              </div>
            </Link>
          </div>
        ) : (
          <div className="flex w-full flex-col gap-3 md:flex-row">
            <Link
              className="flex w-full flex-col rounded-xl bg-zinc-100 p-4 text-black transition-all duration-300 hover:bg-zinc-200 md:p-6"
              href="/registration"
            >
              <div className="mr-auto text-xl font-medium md:text-2xl">
                등기 관리
              </div>
              <div className="mt-8 text-base md:mt-12">
                등기사항을 추가 및 수정할 수 있습니다.
              </div>
            </Link>
            <Link
              className="flex w-full flex-col rounded-xl bg-zinc-100 p-4 text-black transition-all duration-300 hover:bg-zinc-200 md:p-6"
              href="/verify"
            >
              <div className="mr-auto text-xl font-medium md:text-2xl">
                등기 검증하기
              </div>
              <div className="mt-8 text-base md:mt-12">
                발급받은 부동산 등기사항증명서를 검증할 수 있습니다.
              </div>
            </Link>
          </div>
        )
      ) : (
        <div className="mx-auto flex w-full max-w-[450px] flex-col rounded-xl bg-zinc-100 p-4 text-black transition-all duration-300 md:p-6">
          <div className="mx-auto mb-4 text-base font-medium md:mb-8 md:text-lg">
            로그인 후 모든 기능을 이용할 수 있습니다.
          </div>
          <Link
            className="rounded-lg bg-blue-500 px-1.5 py-4 text-center text-sm text-white transition-all duration-300 hover:bg-blue-600 md:px-4 md:text-base"
            href="/login"
          >
            로그인
          </Link>
        </div>
      )}
    </div>
  );
};

export default MainSection;
