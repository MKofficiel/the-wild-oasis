import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router";

const useBookings = () => {
  const [searchParams] = useSearchParams();

  //FILTER

  const filterValue = searchParams.get("status");

  console.log(filterValue, "FILTERVALUE");

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue, methode: "eq" };

  console.log(searchParams);
  const {
    isPending,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings", filter],
    queryFn: () => getBookings({ filter }),
  });
  return { isPending, bookings, error };
};

export default useBookings;
