import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { deleteBooking as apiDeleteBooking } from "../../services/apiBookings";

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: apiDeleteBooking,

    onSuccess: () => {
      toast.success("booking successfully deleted");
      queryClient.invalidateQueries(["bookings"]);
    },

    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteBooking };
};
