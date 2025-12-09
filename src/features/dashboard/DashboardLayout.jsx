import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import { useRecentBooking } from "./useRecentBooking";
import { useRecentStays } from "./useRecentStays";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

const DashboardLayout = () => {
  const { bookings, isPending: isPending1 } = useRecentBooking();
  const { stays, confirmedStays, isPending2 } = useRecentStays();
  if (isPending1 || isPending2) return <Spinner />;

  console.log("bookings", bookings);
  return (
    <StyledDashboardLayout>
      <div>Statistics</div>
      <div>Todays activity </div>
      <div>Chart stay durations</div>
      <div>Chart sales</div>
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;
