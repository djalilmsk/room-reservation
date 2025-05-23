import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

export function CalendarField({
  form,
  label = "",
  name = "",
  placeholder = "Select Booking Date",
  disabled,
  mode = "single",
}) {
  const [date, setDate] = useState(() => {
    const raw = form?.getValues(name);
    return raw === null ? null : raw instanceof Date ? raw : new Date(raw);
  });

  const handleChange = (selectedDate) => {
    if (!selectedDate) return;
    setDate(selectedDate);
    form.setValue(name, selectedDate);
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem>
          <FormLabel className="text-sm">{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className={cn(
                  "w-full overflow-hidden px-0",
                  form.formState.errors[name] &&
                    "dark:border-destructive border-destructive",
                )}
              >
                <div
                  className={cn(
                    "bg-background relative flex h-11 w-full min-w-50 items-center px-3 text-left hover:bg-transparent",
                    date
                      ? "text-popover-foreground"
                      : "text-secondary-foreground",
                  )}
                >
                  {date ? format(date, "PPP") : placeholder}
                  <CalendarIcon className="text-secondary-foreground ml-auto h-4 w-4" />
                  <Separator
                    orientation="vertical"
                    className="absolute right-10 h-full"
                  />
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="pointer-events-auto z-[9999] w-auto p-0"
              align="start"
            >
              <Calendar
                mode={mode}
                selected={date}
                onSelect={(selectedDate) => {
                  if (selectedDate?.getTime() === date?.getTime()) {
                    setDate(null);
                    form.setValue(name, null);
                  } else {
                    setDate(selectedDate);
                    form.setValue(name, selectedDate);
                  }
                }}
                disabled={disabled}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
