import { Note } from "@/utils/types/customs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
export function NoteItem({ note }: { note: Note }) {
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
            <p>Update at:{note.updated_ad}</p>
          </CardFooter>
        </Card>
      </Link>
    </li>
  );
}
