"use client";

import NoteForm from "./note-form";
import { NoteItem } from "./note-item";
import { Note } from "@/utils/types/customs";
import { useNotes } from "@/hooks/useNotes";

export function NoteList() {
  const { data: notes, isLoading } = useNotes();

  const notesArray = Array.isArray(notes) ? notes : [];

  return (
    <>
      <div className="flex items-center justify-center">
        <NoteForm />
      </div>
      <div className="mt-7">
        {notesArray.length <= 0 ? (
          <div className="flex items-center justify-center font-bold">
            You no have any Note yet ! Make one
          </div>
        ) : (
          <ul className="grid grid-cols-4 gap-6 max-sm:grid-cols-1 ">
            {notesArray?.map((note: Note) => {
              return <NoteItem note={note} key={note.id} />;
            })}
          </ul>
        )}
      </div>
    </>
  );
}
