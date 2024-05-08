import { SignedIn, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./ModeToggle";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-3 shadow-md">
      <div className="text-[2rem]">NoteKeep</div>
      <div className="flex gap-8">
        <ModeToggle />
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </header>
  );
}
