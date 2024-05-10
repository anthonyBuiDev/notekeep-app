import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { editNote as editNoteApi } from "@/lib/actions";



type newNote = {
  title: string | null;
  content: string | null;
  image:string | null;
}

export function useEditNote() {
  const queryClient = useQueryClient();

  const { mutate: editNote, isPending: isEditing } =
    useMutation({
      mutationFn: ({ newNote, id }:{ newNote: newNote, id: number } ) => editNoteApi(newNote, id),
      onSuccess: () => {
        toast.success("Note successfully edited");
        queryClient.invalidateQueries({
          queryKey: ["notes"],
        });
      },
      onError: (err) => toast.error(err.message),
    });

  return { editNote, isEditing };
}
