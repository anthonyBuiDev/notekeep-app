"use server"
import getSupabaseServer from "@/utils/supabase/server";
import { auth } from "@clerk/nextjs/server";


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







  const { data, error } = await supabase.from("notes").insert({
    ...newNote,
    user_id: userId,
  });
  console.log(data);
  if(error) throw new Error("Error create Note");
  
  // if (hasImagePath) return data;

  // const { data:test, error: storageError } = await supabase.storage
  //     .from("note-images")
  //     .upload(imageName, newNote.image);

  // console.log(test);
  // if (storageError) {
  //       await supabase
  //         .from("notes")
  //         .delete()
  //         .eq("id", id);
  //       console.error(storageError);

  //       throw new Error(
  //         "Note image could not be uploaded and the Note was not created"
  //       );
  //     }

  return data;
}

export async function editNote(newNote : newNote,id:number){
  const supabase = await getSupabaseServer();
  const  { userId } = auth();

  if(!userId){
    return new Response("User is not logged in", { status: 401 });
  }

  const { data, error } = await supabase.from("notes").update({ ...newNote}).eq("id", id);
      
  if(error) throw new Error("Error edit Note");
  
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


// export async function createEditNote(newNote:newNote, id:number) {

//   const supabase = await getSupabaseServer();
//   const  { userId } = auth();

//   if(!userId){
//     return new Response("User is not logged in", { status: 401 });
//   }
// const supabaseUrl = "https://kcncpiekjfsmkwylphkn.supabase.co";

// const patchImage = newNote.image;
// const nameImage = patchImage?.split("\\").pop();

// const hasImagePath =
//     newNote.image?.startsWith?.(supabaseUrl);


//   const imageName = `${Math.random()}-${
//     nameImage
//   }`.replaceAll("/", "");

//   const imagePath = hasImagePath
//     ? newNote.image
//     : `${supabaseUrl}/storage/v1/object/public/note-images/${imageName}`;

//   // 1. Create/edit Note
//   let query = supabase.from("notes");
 

//   // A) CREATE
//   if (!id)
//     query = query.insert([
//       { ...newNote, image: imagePath },
//     ]);

//   // B) EDIT
//   if (id)
//     query = query
//       .update({ ...newNote, image: imagePath })
//       .eq("id", id);

//   const { data, error } = await query.select().single();

//   if (error) {
//     console.error(error);
//     throw new Error("Note could not be created");
//   }

//   // 2. Upload image
//   if (hasImagePath) return data;

//   const { error: storageError } = await supabase.storage
//     .from("note-images")
//     .upload(imageName, newNote.image);

//   // 3. Delete the Note IF there was an error uplaoding image
//   if (storageError) {
//     await supabase
//       .from("notes")
//       .delete()
//       .eq("id", data.id);
//     console.error(storageError);
//     throw new Error(
//       "Note image could not be uploaded and the Note was not created"
//     );
//   }

//   return data;
// }
