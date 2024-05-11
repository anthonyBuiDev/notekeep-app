import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="m-12 flex items-center justify-center">
      <SignUp />
    </div>
  );
}
