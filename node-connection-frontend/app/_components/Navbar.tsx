"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleLogin = () => {
    router.push("/login");
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.refresh();
    router.push("/");
  };

  const handleAuth = () => {
    if (session) {
      handleLogout();
    } else {
      handleLogin();
    }
  };

  return (
    <nav className="sticky top-0 z-10 flex items-center justify-center bg-white bg-opacity-30 px-4 py-3 text-black backdrop-blur-md md:p-4">
      <div className="flex w-full max-w-[1140px]">
        <Link
          className="my-auto mr-auto flex whitespace-nowrap text-sm font-bold md:text-lg"
          href="/"
        >
          node-connection
        </Link>
        {session?.organization === "ViewerMSP" && (
          <>
            <Link
              className="my-auto rounded-lg px-1.5 py-2 text-sm text-[#4E5968] transition-all duration-300 hover:bg-zinc-200 md:px-4 md:text-base"
              href="/issue"
            >
              발급
            </Link>
            <Link
              className="my-auto rounded-lg px-1.5 py-2 text-sm text-[#4E5968] transition-all duration-300 hover:bg-zinc-200 md:px-4 md:text-base"
              href="/history"
            >
              발급내역
            </Link>
            <Link
              className="my-auto rounded-lg px-1.5 py-2 text-sm text-[#4E5968] transition-all duration-300 hover:bg-zinc-200 md:px-4 md:text-base"
              href="/verify"
            >
              등기 검증
            </Link>
          </>
        )}
        {session?.organization === "RegistryMSP" && (
          <>
            <Link
              className="my-auto rounded-lg px-1.5 py-2 text-sm text-[#4E5968] transition-all duration-300 hover:bg-zinc-200 md:px-4 md:text-base"
              href="/registration"
            >
              등기 관리
            </Link>
            <Link
              className="my-auto rounded-lg px-1.5 py-2 text-sm text-[#4E5968] transition-all duration-300 hover:bg-zinc-200 md:px-4 md:text-base"
              href="/verify"
            >
              등기 검증
            </Link>
          </>
        )}
        <button
          className="my-auto ml-1.5 rounded-lg bg-blue-500 px-1.5 py-2 text-sm text-white transition-all duration-300 hover:bg-blue-600 md:ml-4 md:px-3 md:text-base"
          onClick={handleAuth}
          type="button"
        >
          {session ? "로그아웃" : "로그인"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
