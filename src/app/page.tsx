"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CapsuleComponent } from "./login/components/CapsuleComponent";
import { CapsuleCustom } from "./login/components/CapsuleCustom";
import { CapsuleBare } from "./login/components/CapsuleBare";
import { DreamLogo } from "./assets/logo";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setIsLoading(true);
    router.push("/login");
  };

  return (
    <main className="flex h-full min-h-screen bg-background p-24">
      <div className="flex w-full flex-col items-center justify-center">
        <button
          onClick={handleClick}
          className={`inline-flex h-28 w-28 items-center justify-center rounded-3xl bg-white p-7 transition-transform duration-300 hover:scale-105 ${
            isLoading ? "scale-95 opacity-75" : ""
          }`}
          disabled={isLoading}
        >
          <DreamLogo />
        </button>
      </div>
    </main>
  );
}
