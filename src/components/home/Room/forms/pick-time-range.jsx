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

function TimePicker({ form, name, label }) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl className="relative">
            <div className="relative w-fit">
              <div
                className={cn(
                  "absolute top-1/2 left-0 -z-=1 -translate-y-1/2 text-sm text-nowrap",
                  field.value
                    ? "text-popover-foreground"
                    : "text-secondary-foreground",
                )}
              >
                {field.value || label}
              </div>
              

              {field.value && (
                <X
                  className="text-secondary-foreground absolute top-1/2 right-2 z-20 h-4 w-4 -translate-y-1/2 cursor-pointer"
                  onClick={() => field.onChange("")}
                />
              )}

              <Input
                type="time"
                className={cn(
                  "w-20 cursor-pointer border-0 px-0 ring-0 focus-visible:border-0 focus-visible:ring-0 aria-invalid:ring-0 opacity-0",
                  "[&::-webkit-calendar-picker-indicator]:h-full",
                  "[&::-webkit-calendar-picker-indicator]:w-full",
                  "[&::-webkit-calendar-picker-indicator]:opacity-0",
                )}
                value={field.value}
                onChange={field.onChange}
              />
            </div>
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
      <div className={cn("relative flex h-11 w-full items-center justify-between gap-4 rounded-lg border-1 px-3 hover:bg-muted-foreground/40 ", 
        form.formState.errors.start_time && 'border-destructive'
      )}>
        <div className="flex items-center gap-3">
          <TimePicker name="start_time" label="Start Time" form={form} />
          <p className="text-secondary-foreground -ml-3">-</p>
          <TimePicker name="end_time" label="End Time" form={form} />
        </div>
        <Clock className="text-secondary-foreground h-5 w-4" />
        <Separator orientation="vertical" className="absolute right-10" />
      </div>
    </div>
  );
}
