import Button from "@/components/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="font-size-20 mb-8">Seja bem vindo ao FBV QUIZ!</h1>
      <Link href="/quiz">
        <Button>Start</Button>
      </Link>
    </div>
  );
}
