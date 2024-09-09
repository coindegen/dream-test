import { CapsuleBare } from "./components/CapsuleBare";
import { WelcomeHeader } from "./components/WelcomeHeader";

export default function Login() {
  return (
    <main className="relative flex h-full min-h-screen bg-background p-12">
      <WelcomeHeader />

      <div className="flex w-full flex-col items-center justify-center">
        <CapsuleBare />
      </div>
    </main>
  );
}
