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
import { deleteNote } from "@/lib/actions";
import { Note } from "@/utils/types/customs";
import { useFormStatus } from "react-dom";

export function NoteItem({ note }: { note: Note }) {
  const { pending } = useFormStatus();
  const handleDelete = async () => {
    await deleteNote(note.id);
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
              <Button disabled={pending} size="sm" onClick={handleDelete}>
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
