"use server"
import getSupabaseServer from "@/utils/supabase/server";
import { Note } from "@/utils/types/customs";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";


export async function getNotes(){
  const supabase = await getSupabaseServer();
  const  { userId } = auth();

  if(!userId){
    return new Response("User is not logged in", { status: 401 });
  }
 
  const { data,error } = await supabase.from("notes").select("*");
  
  if(error) throw new Error("Error get Note");
  
  return data;
}

type newNote = {
  title: string | null;
  content: string | null;
}

export async function createNote(newNote : newNote){
  const supabase = await getSupabaseServer();
  const  { userId } = auth();

  if(!userId){
    return new Response("User is not logged in", { status: 401 });
  }

  // const title = formData.get("title")?.toString(); 
  // const content = formData.get("content")?.toString();

  
  const { data, error } = await supabase.from("notes").insert({
    ...newNote,
    user_id: userId,
  });

  if(error) throw new Error("Error create Note");
  
  // revalidatePath("/notes");
  return data;
}

export async function editNote(newNote : newNote,id:number){
  const supabase = await getSupabaseServer();
  const  { userId } = auth();

  if(!userId){
    return new Response("User is not logged in", { status: 401 });
  }

  const { data, error } = await supabase.from("notes").update({ ...newNote}).eq("id", id);
      
  if(error) throw new Error("Error create Note");
  
  return data;
}

export async function deleteNote(id:number){
  const supabase = await getSupabaseServer();
  const  { userId } = auth();

  if(!userId){
    return new Response("User is not logged in", { status: 401 });
  }

  const {data, error } = await supabase
  .from('notes')
  .delete()
  .match({ user_id:userId,id:id })

  if(error) throw new Error("Error delete Note");
  
  // revalidatePath("/notes");
  return data;
}