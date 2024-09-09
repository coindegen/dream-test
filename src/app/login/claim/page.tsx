import { LogoBevel } from "@/app/assets/logoBevel";
import { CapsuleBare } from "../components/CapsuleBare";

export default function Login() {
  return (
    <main className="relative flex h-full min-h-screen bg-background p-12">
      <div className="absolute left-12 top-12">
        <div className="text-3xl font-semibold text-black opacity-50">
          Welcome to
        </div>
        <div className="text-3xl font-semibold text-black">the Dream</div>
      </div>
      <div className="flex w-full flex-col items-center justify-center">
        <div className="flex h-56 w-96 items-center justify-center rounded-2xl border border-black/10 bg-gradient-to-b from-[#e0e0e0] to-[#cccccc] shadow">
          <LogoBevel />
        </div>
        <div className="text-md mt-8 max-w-80 text-center font-normal leading-normal text-black">
          Explain some DreamID Key features to users, and let them know.
        </div>
        <div className="mt-20 flex flex-row space-x-5">
          <div className="inline-flex h-[43px] w-[167px] items-center justify-center gap-2.5 rounded-2xl bg-[#e4e4e4] py-[15px]">
            <div className="shrink grow basis-0 text-center text-[17px] leading-snug text-black opacity-60">
              Maybe Later
            </div>
          </div>
          <div className="inline-flex h-[43px] w-[167px] items-center justify-center gap-2.5 rounded-2xl bg-[#1c1c1c] py-[15px]">
            <div className="font-['SF Pro'] shrink grow basis-0 text-center text-[17px] leading-snug text-white">
              Claim Now
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
