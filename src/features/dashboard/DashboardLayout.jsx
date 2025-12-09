import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import { useRecentBooking } from "./useRecentBooking";
import { useRecentStays } from "./useRecentStays";
import useCabins from "../cabins/useCabins";
import Stats from "./Stats";

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
  if (isPending1 || isPending2) return <Spinner />;

  console.log("bookings", bookings);
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins ? cabins.length : 0}
      />
      <div>Todays activity </div>
      <div>Chart stay durations</div>
      <div>Chart sales</div>
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;
