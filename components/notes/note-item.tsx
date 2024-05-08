"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "../ui/button";
import { TrashIcon } from "lucide-react";
import { createNote, deleteNote } from "@/app/(root)/notes/actions";
import { Note } from "@/utils/types/customs";
import { useFormStatus } from "react-dom";

export function NoteItem({ note }: { note: Note }) {
  const { pending } = useFormStatus();
  const handleDelete = async () => {
    await deleteNote(note.id);
  };
  return (
    <li key={note.id} className="list-none">
      <form>
        <Link href="">
          <Card>
            <CardHeader>
              <CardTitle>{note.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{note.content}</p>
            </CardContent>
            <CardFooter>
              <span className="flex items-center justify-center gap-3">
                <p>Edited at:{note.updated_ad}</p>

                <Button
                  disabled={pending}
                  size="sm"
                  // // formAction={async (data) => {
                  // //   await deleteNote(note.id);
                  // }}
                  onClick={handleDelete}
                >
                  <TrashIcon />
                </Button>
              </span>
            </CardFooter>
          </Card>
        </Link>
      </form>
    </li>
  );
}
