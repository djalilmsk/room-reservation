import { Copyright } from "@/components/home/Footer";
import Filters from "@/components/home/Room/Filters";
import RoomsList from "@/components/home/Room/RoomsList";
import { Page } from "@/components/ui/page";
import { Section } from "@/components/ui/section";

function Rooms() {
  return (
    <Page>
      <Section className="min-h-screen">
        <Filters />
        <RoomsList />
      </Section>
      <Copyright />
    </Page>
  );
}

export default Rooms;
