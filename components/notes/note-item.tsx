"use client";
import { Note } from "@/utils/types/customs";
import NoteCard from "./note-card";

export function NoteItem({ note }: { note: Note }) {
  return (
    <li key={note.id} className="list-none">
      <NoteCard note={note} />
    </li>
  );
}
