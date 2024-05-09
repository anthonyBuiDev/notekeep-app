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
import { Note } from "@/utils/types/customs";
import { useDeleteNote } from "@/hooks/useDeleteNote";

export function NoteItem({ note }: { note: Note }) {
  const { isDeleting, deleteNote } = useDeleteNote();
  const handleDelete = () => {
    deleteNote(note.id);
  };
  return (
    <li key={note.id} className="list-none">
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
              {/* <form
                action={async (data) => {
                  await deleteNote(data);
                }}
              > */}
              <input type="hidden" name="id" value={note.id} />
              <Button disabled={isDeleting} size="sm" onClick={handleDelete}>
                <TrashIcon />
              </Button>
              {/* </form> */}
            </span>
          </CardFooter>
        </Card>
      </Link>
    </li>
  );
}
