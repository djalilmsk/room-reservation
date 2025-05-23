import { Button, buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Section } from "@/components/ui/section";
import { CalendarCheck, DoorOpen, FileQuestion, Home } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Copyright } from "../Footer";
import { cn } from "@/lib/utils";
import BookingsOverview from "./BookingsOverview";

const actions = [
  {
    title: "Book a Room",
    description: "Schedule a Meeting Space for you",
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
];

function ActionCard({ action }) {
  const { title, description, button, to } = action;

  return (
    <div className="bg-secondary/40 flex h-full w-full flex-col justify-between gap-3 rounded-xl p-5">
      <action.icon className="text-primary h-8 w-8" />
      <div>
        <h1 className="text-lg font-bold max-sm:text-base">{title}</h1>
        <p className="text-secondary-foreground text-sm max-sm:text-xs">
          {description}
        </p>
      </div>
      <Link to={to}>
        <Button size="sm">{button}</Button>
      </Link>
    </div>
  );
}

function UserActions() {
  const [date, setDate] = useState(new Date());

  return (
    <Section className="@container flex min-h-screen flex-col justify-between">
      <div className="flex gap-5 max-[800px]:flex-col-reverse">
        {/* <BookingsOverview className="sm:hidden" /> */}
        <div className="flex w-full flex-col gap-2 rounded-lg sm:w-fit">
          <h2 className="text-lg font-bold">Calendar</h2>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className={"bg-secondary/40 rounded-xl p-5 max-sm:w-full"}
            classNames={{
              head_row: "flex w-full justify-between",
              row: "flex w-full mt-2 justify-between",
              day: cn(
                buttonVariants({ variant: "ghost" }),
                "size-8 p-0 font-normal aria-selected:opacity-100",
              ),
            }}
            disabled={(date) => {
              const now = new Date();
              const max = new Date();
              max.setMonth(max.getMonth() + 3);
              return date <= now || date >= max;
            }}
          />
        </div>

        <div className="flex w-full flex-col space-y-6">
          <div className="w-full space-y-2">
            <h2 className="text-lg font-bold">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              {actions.map((action, index) => (
                <ActionCard key={index} action={action} />
              ))}
            </div>
          </div>
          <div>
            <BookingsOverview /* className="max-md:hidden" */ />
          </div>
        </div>
      </div>
      <Copyright />
    </Section>
  );
}

export default UserActions;
