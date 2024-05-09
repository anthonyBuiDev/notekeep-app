import { NoteList } from "@/components/notes/note-list";
import { getNotes } from "@/lib/actions";
import getSupabaseServer from "@/utils/supabase/server";
import { Note } from "@/utils/types/customs";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
export default async function NotesPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
  });

  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteList />
      </HydrationBoundary>
    </main>
  );
}
