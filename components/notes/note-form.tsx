"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "../ui/dialog";

import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

import { useCreateNote } from "@/hooks/useCreateNote";
import { useEditNote } from "@/hooks/useEditNote";
import { EditIcon } from "lucide-react";
import { Note } from "@/utils/types/customs";

const formSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export default function NoteForm({ noteToEdit }: { noteToEdit?: Note }) {
  const { isCreating, createNote } = useCreateNote();
  const { editNote, isEditing } = useEditNote();

  const { id: editId, title, content } = noteToEdit || {};

  const isEditSession = Boolean(editId);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: !isEditSession
      ? {
          title: "",
          content: "",
        }
      : {
          title: title || "",
          content: content || "",
        },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    if (isEditSession && editId !== undefined)
      editNote(
        { newNote: { ...data }, id: editId },
        {
          onSuccess: (data) => {
            form.reset();
          },
        },
      );
    else
      createNote(
        { ...data },
        {
          onSuccess: (data) => {
            form.reset();
          },
        },
      );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {isEditSession ? (
          <Button variant="ghost" className="w-full">
            Edit
          </Button>
        ) : (
          <Button>Create new Note</Button>
        )}
      </DialogTrigger>
      <DialogContent className=" sm:max-w-[425px]">
        <Form {...form}>
          <form
            className="m-2 space-y-2"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Title" {...field} required />
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
                <Button type="submit">
                  {isEditSession ? "Edit Note" : "Create new New"}
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
