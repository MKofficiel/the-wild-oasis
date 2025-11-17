import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router";
import { FILTER_PARAMS, SORT_PARAM } from "../../constants";

const useBookings = () => {
  const [searchParams] = useSearchParams();

  //FILTER

  const filterValue = searchParams.get(FILTER_PARAMS);

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue, methode: "eq" };

  //SORT

  const sortByRaw = searchParams.get(SORT_PARAM) || "startDate-desc";

  const [field, direction] = sortByRaw.split("-");

  const sortBy = { field, direction };

  const {
    isPending,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy],
    queryFn: () => getBookings({ filter, sortBy }),
  });
  return { isPending, bookings, error };
};

export default useBookings;
