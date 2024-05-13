import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  EllipsisVertical,
  MoreHorizontal,
  MoreHorizontalIcon,
  TrashIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { useDeleteNote } from "@/hooks/useDeleteNote";
import { Note } from "@/utils/types/customs";
import Image from "next/image";
import NoteForm from "./note-form";
import { formatDate } from "@/lib/helpers";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
export default function NoteCard({ note }: { note: Note }) {
  const { isDeleting, deleteNote } = useDeleteNote();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{note.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{note.content}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-3">
        <span>Edited at {formatDate(note.updated_ad ?? "")}</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <EllipsisVertical className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="flex flex-col ">
            <NoteForm noteToEdit={note} />
            <Button
              variant="ghost"
              onClick={() => deleteNote(note.id)}
              className="w-full"
            >
              Delete
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
}
