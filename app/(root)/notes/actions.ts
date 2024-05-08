"use server"

import getSupabaseServer from "@/utils/supabase/server";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function createNote(formData:FormData){
  const supabase = await getSupabaseServer();
  const  { userId } = auth();

 
  const title = formData.get("title")?.toString(); 
  const content = formData.get("content")?.toString();

  
  const {  error } = await supabase.from("notes").insert({
    title: title,
    content,
    user_id: userId,
  });
  if(error) throw new Error("Error create Note");
  
  revalidatePath("/notes");
}