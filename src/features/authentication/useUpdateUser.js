import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateCurrentUser as updateCurrentUserApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const { mutate: updateCurrentUser, isPending } = useMutation({
    mutationFn: (data) => updateCurrentUserApi(data),

    onSuccess: ({ user }) => {
      toast.success("User account successfully updated ");
      // queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.setQueryData(["user"], user);
    },
  });
  return {
    updateCurrentUser,
    isPending,
  };
};
