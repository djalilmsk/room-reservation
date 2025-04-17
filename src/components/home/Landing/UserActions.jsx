import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Section } from "@/components/ui/section";
import { CalendarCheck, DoorOpen, FileQuestion, Home } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const actions = [
  {
    title: "Book a Room",
    description: "Schedule a Meeting Space for Your Team",
    button: "Book Now",
    to: "/rooms",
    icon: Home,
  },
  {
    title: "My Bookings",
    description: "View and manage your reservations",
    button: "View All",
    to: "/current-bookings",
    icon: CalendarCheck,
  },
  {
    title: "Available Now",
    description: "Find all rooms available right now",
    button: "Check Available",
    to: "/rooms?available=true",
    icon: DoorOpen,
  },
  {
    title: "Something",
    description: "Do something with this action",
    button: "Do something",
    to: "/?do=something",
    icon: FileQuestion,
  },
];

function ActionCard({ action }) {
  const { title, description, button, to } = action;

  return (
    <div className="bg-secondary/40 flex h-full w-full flex-col justify-between gap-3 rounded-xl p-5">
      <action.icon className="text-primary h-8 w-8" />
      <h1 className="text-lg font-bold">{title}</h1>
      <p className="text-secondary-foreground text-sm">{description}</p>
      <Link to={to}>
        <Button size="sm">{button}</Button>
      </Link>
    </div>
  );
}

function UserActions() {
  const [date, setDate] = useState(new Date());

  console.log(date);

  return (
    <Section className="flex gap-5 max-[800px]:flex-col">
      <div className="flex w-fit flex-col gap-2 rounded-lg">
        <h2 className="text-lg font-bold">Calendar</h2>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="bg-secondary/40 rounded-xl p-5"
          disabled={(date) => {
            const now = new Date();
            const max = new Date();
            max.setMonth(max.getMonth() + 3);
            return date <= now || date >= max;
          }}
        />
      </div>
      <div className="space-y-2 w-full">
        <h2 className="text-lg font-bold">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
          {actions.map((action, index) => (
            <ActionCard key={index} action={action} />
          ))}
        </div>
      </div>
    </Section>
  );
}

export default UserActions;
