import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createNote as createNoteApi } from "@/lib/actions";

export function useCreateNote() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createNote } =
    useMutation({
      mutationFn: createNoteApi,
      onSuccess: () => {
        toast.success("New Notes successfully created");
        queryClient.invalidateQueries({
          queryKey: ["notes"],
        });
      },
      onError: (err) => toast.error(err.message),
    });
  return { isCreating, createNote };
}