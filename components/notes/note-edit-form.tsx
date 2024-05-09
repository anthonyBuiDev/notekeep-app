import { Input } from "../ui/input";
import { Button } from "../ui/button";
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
import { Note } from "@/utils/types/customs";
const formSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export function NoteEditForm({ note }: { note: Note }) {
  const { editNote, isEditing } = useEditNote();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

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
  );
}
