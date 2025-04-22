import { Minus, Plus, UsersIcon } from "lucide-react";
import { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

export function RoomCapacity({ control, name }) {
  const [counter, setCounter] = useState(0);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm">Room Capacity</FormLabel>
          <FormControl className="relative">
            <div className="text-secondary-foreground flex  h-11 items-center justify-between gap-3 rounded-lg border-1 px-3">
              <div className="text-secondary-foreground w-9/10 flex h-11 items-center justify-between pr-4">
                <Minus
                  className="h-4 w-4 cursor-pointer"
                  onClick={() => {
                    const newValue = Math.max(0, counter - 1);
                    setCounter(newValue);
                    field.onChange(newValue);
                  }}
                />
                <div
                  className={cn(
                    "px-5",
                    counter === 0
                      ? "text-secondary-foreground"
                      : "text-popover-foreground",
                  )}
                >
                  {counter}
                </div>
                <Plus
                  className="h-4 w-4 cursor-pointer"
                  onClick={() => {
                    const newValue = counter + 1;
                    setCounter(newValue);
                    field.onChange(newValue);
                  }}
                />
              </div>
              <Separator className="absolute right-10" orientation="vertical" />
              <UsersIcon className="h-4 w-4" />

              <input type="hidden" {...field} value={counter} />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
