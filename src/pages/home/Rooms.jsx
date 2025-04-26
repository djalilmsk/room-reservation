import { Copyright } from "@/components/home/Footer";
import Filters from "@/components/home/Room/Filters";
import RoomsList from "@/components/home/Room/RoomsList";
import { Page } from "@/components/ui/page";
import { Section } from "@/components/ui/section";
import { socket } from "@/utils";

function Rooms() {
  return (
    <Page className="space-y-12 max-sm:pt-12 sm:space-y-24 md:pt-5 lg:space-y-28">
      <Section className="min-h-screen">
        <Filters />
        <RoomsList status="available" />
      </Section>
      <Copyright />
    </Page>
  );
}

export default Rooms;
