import getSupabaseServer from "@/utils/supabase/server";

export default async function ServerSideTest() {
  const supabase = await getSupabaseServer();

  const { data } = await supabase.from("notes").select("*");

  return (
    <div>
      {data &&
        data.map((note) => (
          <div key={note.id}>
            <p>{note.title}</p>
          </div>
        ))}
    </div>
  );
}
