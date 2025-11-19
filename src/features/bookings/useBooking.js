import { useParams } from "react-router";
import { getBooking } from "../../services/apiBookings";

import { useQuery } from "@tanstack/react-query";

const useBooking = () => {
  const { bookingId } = useParams();

  const {
    isPending,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking"],
    queryFn: () => getBooking(bookingId),
    retry: false,
  });
  return { isPending, booking, error };
};

export default useBooking;
