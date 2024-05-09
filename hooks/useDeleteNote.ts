import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteNote as deleteNoteApi } from "@/lib/actions";

export function useDeleteNote() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteNote } =
    useMutation({
      mutationFn: deleteNoteApi,
      onSuccess: () => {
        toast.success("Notes successfully deleted");
        queryClient.invalidateQueries({
          queryKey: ["notes"],
        });
      },
      onError: (err) => toast.error(err.message),
    });

  return { isDeleting, deleteNote };
}
