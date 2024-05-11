import { SignedIn, UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-3 shadow-md">
      <div className="text-[1.5rem]">NoteKeep</div>
      <div className="flex gap-8">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </header>
  );
}
