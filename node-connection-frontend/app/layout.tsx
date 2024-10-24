import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { gowunBatang, spaceMono } from "./fonts";
import NextAuthSessionProvider from "./_providers/NextAuthSessionProvider";
import JotaiProvider from "./_providers/JotaiProvider";

export const metadata: Metadata = {
  title: "node-connection",
  description: "node-connection",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ko" className={`${spaceMono.variable} ${gowunBatang.variable}`}>
      <body className="font-spaceMono box-border h-full w-full bg-white">
        <JotaiProvider>
          <NextAuthSessionProvider>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              pauseOnFocusLoss={false}
              theme="light"
            />
            {children}
          </NextAuthSessionProvider>
        </JotaiProvider>
      </body>
    </html>
  );
};

export default RootLayout;
