import {
  HiOutlineBriefcase,
  HiOutlineCalendar,
  HiOutlineChartBar,
} from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

export default function Stats({
  bookings,
  confirmedStays,
  numDays,
  cabinCount,
}) {
  console.log(bookings.length, "bb");
  // 1. Total bookings
  const numberOfBookings = bookings ? bookings.length : 0;

  // 2. Total sales
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  // 3. Total check ins
  const checkins = confirmedStays ? confirmedStays.length : 0;

  // 4. Occupancy rate
  // num checked in night /all available might
  const occupancyRate =
    bookings.length > 0 &&
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
      (numDays * cabinCount);
  return (
    <>
      <Stat
        title='Bookings'
        color='blue'
        icon={<HiOutlineBriefcase />}
        value={numberOfBookings}
      />
      <Stat
        title='Sales'
        color='green'
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title='Check ins'
        color='indigo'
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title='Occupancy rate'
        color='yellow'
        icon={<HiOutlineChartBar />}
        value={Math.round(occupancyRate * 100) + "%"}
      />
    </>
  );
}
