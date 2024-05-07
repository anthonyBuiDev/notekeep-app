"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { useAuth } from "@clerk/nextjs";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  desc: z.string(),
});

const apiHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export default function NoteForm() {
  const { userId } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      desc: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const currentTime = new Date().getTime();

    const createdNote = await fetch("/api/notes", {
      method: "POST",
      headers: apiHeaders,
      body: JSON.stringify({
        insertData: {
          title: values.title,
          desc: values.desc,
          user_id: userId,
        },
      }),
    });

    if (createdNote.ok) {
      console.log("up ok");
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="desc"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="desc" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
