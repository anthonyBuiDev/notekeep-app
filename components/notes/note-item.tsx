"use client";

import { Note } from "@/utils/types/customs";

import { useEditNote } from "@/hooks/useEditNote";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import NoteCard from "./note-card";

const formSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export function NoteItem({ note }: { note: Note }) {
  const { editNote, isEditing } = useEditNote();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: note.title ?? "",
      content: note.content ?? "",
    },
  });

  return (
    <li key={note.id} className="list-none">
      <NoteCard note={note} />
    </li>
  );
}
