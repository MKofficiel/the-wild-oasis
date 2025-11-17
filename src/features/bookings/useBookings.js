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

  //Pagination

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isPending,
    data: { data: bookings, count }={},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });
  return { isPending, bookings, error, count };
};

export default useBookings;
