import { getNotes } from "@/lib/actions";
import { useQuery } from "@tanstack/react-query";

export function useNotes() {
  return useQuery({
    queryFn: async () => getNotes(),
    queryKey: ["notes"],
  });
}