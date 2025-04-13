import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Clock, X } from "lucide-react";
import { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

function TimePicker({ control, name, time, label, setTime }) {

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl className="relative">
            <div className="relative w-fit">
              <div
                className={cn(
                  "absolute top-1/2 left-0 -z-1 -translate-y-1/2 text-sm text-nowrap",
                  time
                    ? "text-popover-foreground"
                    : "text-secondary-foreground",
                )}
              >
                {time || label}
              </div>

              {time && (
                <X
                  className="text-secondary-foreground absolute top-1/2 right-2 z-20 h-4 w-4 -translate-y-1/2 cursor-pointer"
                  onClick={() => {
                    setTime("");
                    field.onChange("");
                  }}
                />
              )}

              <Input
                type="time"
                className={cn(
                  "w-20 cursor-pointer border-0 px-0 ring-0 focus-visible:border-0 focus-visible:ring-0 aria-invalid:ring-0",
                  "[&::-webkit-calendar-picker-indicator]:h-full",
                  "[&::-webkit-calendar-picker-indicator]:w-full",
                  "[&::-webkit-calendar-picker-indicator]:opacity-0",
                )}
                value={time}
                onChange={(e) => {
                  setTime(e.target.value);
                  field.onChange(e);
                }}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function PickTimeRange({ control }) {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  return (
    <div className="relative inline-block w-full space-y-2">
      <FormLabel className="text-sm">Booking Time</FormLabel>
      <div className="relative flex h-11 w-full items-center justify-between gap-4 rounded-lg border-1 px-3">
        <div className="flex items-center gap-3">
          <TimePicker
            name="startTime"
            time={startTime}
            label="Start Time"
            control={control}
            setTime={setStartTime}
          />
          <p className="text-secondary-foreground -ml-3">-</p>
          <TimePicker
            name="endTime"
            time={endTime}
            label="End Time"
            control={control}
            setTime={setEndTime}
          />
        </div>
        <Clock className="text-secondary-foreground h-5 w-4" />
        <Separator orientation="vertical" className="absolute right-10" />
      </div>
    </div>
  );
}
