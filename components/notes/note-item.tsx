"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { TrashIcon } from "lucide-react";
import { Note } from "@/utils/types/customs";
import { useDeleteNote } from "@/hooks/useDeleteNote";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "../ui/dialog";

import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useEditNote } from "@/hooks/useEditNote";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export function NoteItem({ note }: { note: Note }) {
  const { isDeleting, deleteNote } = useDeleteNote();

  const { editNote, isEditing } = useEditNote();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: note.title ?? "",
      content: note.content ?? "",
    },
  });

  const handleDelete = () => {
    deleteNote(note.id);
  };
  function onSubmit(values: z.infer<typeof formSchema>) {
    const data = {
      title: values.title,
      content: values.content,
    };

    editNote(
      { newNoteData: { ...data }, id: note.id },
      {
        onSuccess: (data) => {
          form.reset();
        },
      },
    );
  }
  return (
    <li key={note.id} className="list-none">
      <Dialog>
        <DialogTrigger asChild>
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
                <input type="hidden" name="id" value={note.id} />
                <Button disabled={isDeleting} size="sm" onClick={handleDelete}>
                  <TrashIcon />
                </Button>
              </span>
            </CardFooter>
          </Card>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <Form {...form}>
            <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Title"
                        {...field}
                        required
                        disabled={isEditing}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="content"
                        {...field}
                        required
                        disabled={isEditing}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <DialogClose asChild>
                  <Button type="submit" disabled={isEditing}>
                    Save changes
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </li>
  );
}
