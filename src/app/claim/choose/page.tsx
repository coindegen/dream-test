import { LogoBevel } from "@/app/assets/logoBevel";
import { ClaimUniqueHeader } from "@/app/claim/components/ClaimUniqueHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Login() {
  return (
    <main className="relative flex h-full min-h-screen flex-col justify-center bg-background p-12">
      <ClaimUniqueHeader />

      <div className="mx-auto flex w-full max-w-96 flex-col items-center justify-center rounded-xl bg-neutral-300 p-2">
        <div className="relative flex h-56 w-full items-center justify-center rounded-2xl border border-black/10 bg-gradient-to-b from-[#e5e5e5] to-[#cccccc] shadow">
          <div className="absolute bottom-3 left-5 text-center text-[28px] leading-tight text-black/20">
            Daniel
          </div>

          <LogoBevel />
        </div>

        <div className="mt-6 flex w-full">
          <input className="h-12 flex-1 rounded-md px-4 text-xl font-normal tracking-wide" />
        </div>
        <div className="mt-2 flex w-full">
          <Button size="lg" className="flex-1 text-base font-normal" asChild>
            <Link href="/claim">Continue</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
