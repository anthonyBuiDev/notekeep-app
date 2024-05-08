import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default function Home() {
  const { userId } = auth();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 ">
      {userId ? (
        <Button>
          <Link href="/notes">You notes</Link>
        </Button>
      ) : (
        <Button>
          <Link href="/sign-in">Start Your Note</Link>
        </Button>
      )}
    </main>
  );
}
