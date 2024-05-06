import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: notes, error } = await supabase.from("notes").select();
  return (
    <main className=" flex min-h-screen flex-col items-center justify-between p-24 ">
      <ul>{notes?.map((note) => <li key={note.id}>{note.title}</li>)}</ul>
    </main>
  );
}
