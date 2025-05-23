import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Clock, X } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const generateTimeOptions = () => {
  const times = [];
  let hour = 7;
  let minute = 0;
  while (hour < 18 || (hour === 18 && minute === 0)) {
    const h = String(hour).padStart(2, "0");
    const m = String(minute).padStart(2, "0");
    times.push(`${h}:${m}`);
    minute += 30;
    if (minute === 60) {
      minute = 0;
      hour++;
    }
  }
  return times;
};

const timeOptions = generateTimeOptions();

export function CustomTimePicker({ form, name, label }) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-fit">
          <FormControl>
            <Popover>
              <PopoverTrigger asChild>
                <div className="relative">
                  <Button
                    variant="none"
                    type="button"
                    className={cn(
                      "text-secondary-foreground relative justify-between px-0 pr-2 text-left font-normal",
                      field.value && "text-popover-foreground",
                    )}
                  >
                    {field.value || "Select time"}
                    {field.value && <span className="w-4" />}
                  </Button>

                  {field.value && (
                    <X
                      className="text-muted-foreground absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        field.onChange("");
                      }}
                    />
                  )}
                </div>
              </PopoverTrigger>

              <PopoverContent className="pointer-events-auto w-32 p-0">
                <div className="max-h-60 overflow-y-auto">
                  {timeOptions.map((time) => (
                    <button
                      key={time}
                      onClick={() => field.onChange(time)}
                      className={cn(
                        "hover:bg-muted-foreground/50 hover:text-accent-foreground w-full cursor-pointer px-4 py-2 text-left text-sm",
                        field.value === time && "bg-secondary/50 text-primary",
                      )}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </FormControl>
        </FormItem>
      )}
    />
  );
}

export function PickTimeRange({ form }) {
  return (
    <div className="relative inline-block w-full space-y-2">
      <FormLabel className="text-sm">Booking Time</FormLabel>
      <div
        className={cn(
          "hover:bg-muted-foreground/40 relative flex h-11 w-full items-center justify-between gap-4 rounded-lg border px-3",
          form.formState.errors.start_time && "border-destructive",
        )}
      >
        <div className="flex items-center gap-3">
          <CustomTimePicker name="start_time" label="Start Time" form={form} />
          <p className="text-muted-foreground -ml-2">-</p>
          <CustomTimePicker name="end_time" label="End Time" form={form} />
        </div>
        <Clock className="text-secondary-foreground h-5 w-4" />
        <Separator orientation="vertical" className="absolute right-10" />
      </div>
    </div>
  );
}
