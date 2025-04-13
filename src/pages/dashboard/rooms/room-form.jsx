import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { roomSchema } from "@/utils/forms/room-schema";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Save, X } from "lucide-react";

function RoomForm({ onSubmit: externalOnSubmit, defaultValues }) {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(roomSchema),
    defaultValues: defaultValues || {
      name: "",
      capacity: 0,
      amenities: "",
      type: "",
      note: "",
      description: "",
      status: "Available",
    },
  });

  const onSubmit = (data) => {
    if (externalOnSubmit) {
      externalOnSubmit(data);
    }
    console.log(data);
  };

  const onError = (errors) => {
    console.error(errors);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room Name*</FormLabel>
              <FormControl>
                <Input placeholder="Enter room name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="capacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Capacity*</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter capacity"
                  {...field}
                  onChange={(e) =>
                    field.onChange(parseInt(e.target.value) || 0)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amenities"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amenities</FormLabel>
              <FormControl>
                <Input placeholder="Enter amenities " type="text" {...field} />
              </FormControl>
              <FormDescription>
                Enter amenities separated by commas (e.g., WiFi, TV, AC)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Input placeholder="Enter room type" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter notes" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Booked">Booked</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-3">
          <Button type="submit" className="w-40">
            <Save className="h-4 w-4" />
            Submit
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate(-1)}
          >
            <X className="h-4 w-4" />
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default RoomForm;
