import React from "react";
import { getCabins } from "../../services/apiCabins";
import { useQuery } from "@tanstack/react-query";

const useCabins = () => {
  const {
    isPending,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
  return { isPending, cabins, error };
};

export default useCabins;
