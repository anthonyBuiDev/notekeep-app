import NoteForm from "./note-form";
import { NoteItem } from "./note-item";
import { Note } from "@/utils/types/customs";

export function NoteList({ notes }: { notes: Array<Note> }) {
  return (
    <>
      <div className="flex items-center justify-center">
        <NoteForm />
      </div>
      <div className="mt-6">
        <ul className="grid grid-cols-4 gap-6 max-sm:grid-cols-1 ">
          {notes.map((note) => {
            return <NoteItem note={note} key={note.id} />;
          })}
        </ul>
      </div>
    </>
  );
}
