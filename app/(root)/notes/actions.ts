"use server"

import getSupabaseServer from "@/utils/supabase/server";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function createNote(formData :FormData){
  const supabase = await getSupabaseServer();
  const  { userId } = auth();

 
  const  title = formData.get("title");
  const  content = formData.get("content");
  console.log(title);
  
  const {  error } = await supabase.from("notes").insert({
    title,
    content,
    user_id: userId,
  });
  if(error) throw new Error("Error create Note");
  
  revalidatePath("/notes");
}