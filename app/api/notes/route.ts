import getSupabaseServer from "@/utils/supabase/server"
import { handleErrorResponse, handleJSErrorResponse } from "@/utils/supabase/supabaseErrorHandlers";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function GET(){
  try{
    const { userId } = auth();
      const supabase = await getSupabaseServer();

      const{data, error} = await supabase
      .from("notes")
      .select('*')
      .order('id', { ascending: false })
      .eq('user_id', userId);;
      handleErrorResponse(error);
      return NextResponse.json(data, { status: 201 });

  }catch(error){
      const err = error as Error;

        handleJSErrorResponse(err.message);
  }
}

export async function POST(request: Request) {
  try {
      const supabase = await getSupabaseServer();

      const body = await request.json();
      const { insertData } = body;

      const { data, error } = await supabase
      .from('notes')
      .insert([insertData]).select();
      handleErrorResponse(error);

      return NextResponse.json(data, { status: 201 });
  } catch (error) {
      const err = error as Error;

      handleJSErrorResponse(err.message);
  }
}


export async function PUT(request: Request) {
  try {
      const supabase = await getSupabaseServer();

      const body = await request.json();
      const { updatedData } = body;

      const { searchParams } = new URL(request.url);
      const id = searchParams.get('id');

      const { data, error } = await supabase
          .from('notes')
          .update(updatedData)
          .eq('id', id)
          .select();

      handleErrorResponse(error);

      return NextResponse.json(data, { status: 201 });
  } catch (error) {
      const err = error as Error;

      handleJSErrorResponse(err.message);
  }
}

export async function DELETE(request: Request) {
  try {
      const supabase = await getSupabaseServer();

      const { searchParams } = new URL(request.url);
      const id = searchParams.get('id');

      const { data, error } = await supabase
          .from('notes')
          .delete()
          .eq('id', id)
          .select();

      handleErrorResponse(error);

      return NextResponse.json(data, { status: 201 });
  } catch (error) {
      const err = error as Error;

      handleJSErrorResponse(err.message);
  }
}
