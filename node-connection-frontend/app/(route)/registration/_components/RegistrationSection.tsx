"use client";

import { useState } from "react";
import RegistrationAddSection from "./RegistrationAddSection";
import RegistrationEditSection from "./RegistrationEditSection";

const RegistrationSection = () => {
  const [mode, setMode] = useState("add");

  const handleAdd = () => {
    setMode("add");
  };
  const handleEdit = () => {
    setMode("edit");
  };

  return (
    <div className="flex w-full flex-col items-center pb-5">
      <div className="flex w-full flex-col">
        <div className="flex gap-2">
          <button
            className={`mt-2 w-full rounded-lg py-3 transition-all duration-300 ${mode === "add" ? "cursor-default border border-blue-500 bg-blue-500 text-white" : "border border-zinc-200 bg-white text-black"}`}
            onClick={handleAdd}
            type="button"
          >
            추가
          </button>
          <button
            className={`mt-2 w-full rounded-lg py-3 transition-all duration-300 ${mode === "edit" ? "cursor-default border border-blue-500 bg-blue-500 text-white" : "border border-zinc-200 bg-white text-black"}`}
            onClick={handleEdit}
            type="button"
          >
            수정
          </button>
        </div>
        {mode === "add" ? (
          <RegistrationAddSection />
        ) : (
          <RegistrationEditSection />
        )}
      </div>
    </div>
  );
};

export default RegistrationSection;
