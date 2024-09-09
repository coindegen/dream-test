import { CapsuleBare } from "./components/CapsuleBare";

export default function Login() {
  return (
    <main className="flex h-full min-h-screen bg-background p-12">
      <div className="flex w-full flex-col items-center justify-between">
        <div className="z-10 w-full max-w-5xl flex-col items-start justify-between text-sm lg:flex">
          <div className="text-3xl font-semibold text-black opacity-50">
            Welcome to
          </div>
          <div className="text-3xl font-semibold text-black">the Dream</div>
        </div>
        <CapsuleBare />
      </div>
    </main>
  );
}
