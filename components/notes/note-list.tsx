"use client";
import { useQuery } from "@tanstack/react-query";
import NoteForm from "./note-form";
import { NoteItem } from "./note-item";

import { getNotes } from "@/lib/actions";
import { Note } from "@/utils/types/customs";

function useGetNotes() {
  return useQuery({
    queryFn: async () => getNotes(),
    queryKey: ["notes"],
  });
}

export function NoteList() {
  const { data: notes, isLoading } = useGetNotes();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const notesArray = Array.isArray(notes) ? notes : [];

  return (
    <>
      <div className="flex items-center justify-center">
        <NoteForm />
      </div>
      <div className="mt-6">
        <ul className="grid grid-cols-4 gap-6 max-sm:grid-cols-1 ">
          {notesArray?.map((note: Note) => {
            return <NoteItem note={note} key={note.id} />;
          })}
        </ul>
      </div>
    </>
  );
}
