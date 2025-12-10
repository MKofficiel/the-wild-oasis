import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import { useRecentBooking } from "./useRecentBooking";
import { useRecentStays } from "./useRecentStays";
import useCabins from "../cabins/useCabins";
import Stats from "./Stats";
import SalesChart from "./SalesChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

const DashboardLayout = () => {
  const { bookings, isPending: isPending1 } = useRecentBooking();
  const { stays, confirmedStays, isPending2, numDays } = useRecentStays();

  const { cabins, isPending3 } = useCabins();
  if (isPending1 || isPending2 || isPending3) return <Spinner />;
  const cabinLength = cabins.length;

  console.log("bookings", bookings);
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabinLength}
      />
      <div>Todays activity </div>
      <div>Chart stay durations</div>
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;
