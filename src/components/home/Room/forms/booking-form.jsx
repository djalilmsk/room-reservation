import { CalendarField } from "@/components/home/Room/forms/pick-date";
import { PickTimeRange } from "@/components/home/Room/forms/pick-time-range";
import { Form, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import React from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import { Pin } from "lucide-react";
import { buttonLabel } from "@/components/ui/button-label";
import { isPending } from "@reduxjs/toolkit";

export function BookingForm({ onSubmit: externalSubmit, form = null, isPending }) {
  const onSubmit = (data) => {
    if (externalSubmit) {
      externalSubmit(data);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-5" onSubmit={form?.handleSubmit(onSubmit)}>
        <CalendarField
          name="date"
          label="Booking Date*"
          form={form}
          disabled={(date) => {
            const now = new Date();
            const max = new Date();
            max.setMonth(max.getMonth() + 3);
            return date <= now || date >= max;
          }}
        />

        <div className="space-y-2">
          <PickTimeRange form={form} />
          {form?.formState.errors.start_time && (
            <FormMessage>
              {form?.formState.errors.start_time.message}
            </FormMessage>
          )}
        </div>
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <DialogClose
            onClick={() => form?.reset()}
            className="bg-background hover:bg-accent dark:bg-input/30 dark:border-input dark:hover:bg-input/50 hover:text-popover-foreground cursor-pointer rounded-lg border px-3 transition-all duration-300"
          >
            Cancel
          </DialogClose>
          <Button type="submit">
            {buttonLabel(
              isPending,
              <>
                <Pin className="h-4 w-4" />
                Book Now
              </>,
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
