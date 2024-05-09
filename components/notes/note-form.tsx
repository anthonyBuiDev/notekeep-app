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

import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";

import { createNote } from "@/lib/actions";
import { useRef } from "react";
import { useCreateNote } from "@/hooks/useCreateNote";

const formSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export default function NoteForm() {
  // const formRef = useRef<HTMLFormElement>(null);
  const { isCreating, createNote } = useCreateNote();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createNote(
      { ...values },
      {
        onSuccess: (data) => {
          form.reset();
        },
      },
    );
    console.log(values);
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
                <Textarea placeholder="content" {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isCreating}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
