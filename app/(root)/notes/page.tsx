import NoteForm from "@/components/note-form";
import { NoteList } from "@/components/notes/note-list";
import getSupabaseServer from "@/utils/supabase/server";

interface Note {
  id: number;
  title: string;
}

const notes: Note[] = [];

export default async function NotesPage() {
  const supabase = await getSupabaseServer();

  const { data: notes } = await supabase.from("notes").select("*");

  return (
    <div>
      <NoteList notes={notes ?? []} />
    </div>
  );
}
