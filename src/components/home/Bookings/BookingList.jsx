import { Page } from "@/components/ui/page";
import { useUser } from "@/hooks/useUser";
import BooingList from "@/pages/dashboard/booking/booing-list";

function CurrentBookings() {
  const { data } = useUser();
  return (
    <Page>
      <BooingList
        status=""
        url={`/user/${data.id}`}
        title="Booking List"
        to="/current-bookings"
      />
    </Page>
  );
}

export default CurrentBookings;
