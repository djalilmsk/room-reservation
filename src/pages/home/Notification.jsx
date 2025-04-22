import { Page } from "@/components/ui/page";
import { SectionTitle } from "@/components/ui/section";
import { useUser } from "@/hooks/useUser";
import { useEffect } from "react";

function Notification() {
  const { data } = useUser();

  console.log("not");

  return (
    <Page>
      <SectionTitle>Notifications</SectionTitle>
    </Page>
  );
}

export default Notification;
