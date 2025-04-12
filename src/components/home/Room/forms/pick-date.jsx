import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export function CalendarField({
  control,
  label = "",
  name = "",
  placeholder = "Select Booking Date",
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm">{label}</FormLabel>
          <Popover>
            <Button
              type="button"
              variant="outline"
              className="overflow-hidden px-0 w-full"
            >
              <PopoverTrigger asChild>
                <div
                  className={cn(
                    "bg-background relative flex h-11 w-full items-center px-3 text-left hover:bg-transparent min-w-50",
                    field.value
                      ? "text-popover-foreground"
                      : "text-secondary-foreground",
                  )}
                >
                  {field.value ? format(field.value, "PPP") : placeholder}
                  <CalendarIcon className="text-secondary-foreground ml-auto h-4 w-4" />
                  <Separator
                    orientation="vertical"
                    className="absolute right-10 h-full"
                  />
                </div>
              </PopoverTrigger>
            </Button>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) => date < new Date()}
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
