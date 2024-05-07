"use client";

import NoteForm from "@/components/NoteForm";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const apiHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
interface Note {
  id: number;
  title: string;
}

const notes: Note[] = [];

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([] as Note[]);
  const getNotes = async () => {
    const fetchingNotes = await fetch("/api/notes", {
      method: "GET",
      headers: apiHeaders,
    });

    const apiData = await fetchingNotes.json();
    setNotes(apiData);
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-center">
        <NoteForm />
      </div>
      <div className="mt-9">
        {notes.map((note) => {
          return <li key={note.id}>{note.title}</li>;
        })}
      </div>
    </div>
  );
}
