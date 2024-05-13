import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrashIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useDeleteNote } from "@/hooks/useDeleteNote";
import { Note } from "@/utils/types/customs";
import Image from "next/image";
import NoteForm from "./note-form";
import { formatDate } from "@/lib/helpers";
export default function NoteCard({ note }: { note: Note }) {
  const { isDeleting, deleteNote } = useDeleteNote();

  return (
    <Card>
      <CardHeader>
        {note.image ? (
          <Image
            src="https://kcncpiekjfsmkwylphkn.supabase.co/storage/v1/object/public/note-images/kristaps-ungurs-uO7d-soLO2A-unsplash.jpg"
            width="100"
            height="100"
            alt={`image ${note.image}`}
            priority={true}
            className="h-80 w-80 object-cover"
          />
        ) : (
          ""
        )}
        <CardTitle>{note.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{note.content}</p>
      </CardContent>
      <CardFooter>
        <span className="flex items-center justify-center gap-3">
          <p>Edited at {formatDate(note.updated_ad ?? "")}</p>
          <Button
            disabled={isDeleting}
            size="sm"
            onClick={() => deleteNote(note.id)}
          >
            <TrashIcon />
          </Button>
          <NoteForm noteToEdit={note} />
        </span>
      </CardFooter>
    </Card>
  );
}
