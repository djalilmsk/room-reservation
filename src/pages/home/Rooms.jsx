import Filters from "@/components/home/Room/Filters";
import RoomsList from "@/components/home/Room/RoomsList";
import { Page } from "@/components/ui/page";
import { Section } from "@/components/ui/section";

function Rooms() {
  return (
    <Page>
      <Section>
        <Filters />
        <RoomsList />
      </Section>
    </Page>
  );
}

export default Rooms;
