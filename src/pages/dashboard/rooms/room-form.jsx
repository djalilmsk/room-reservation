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
import { ImageUp, Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { buttonLabel } from "@/components/ui/button-label";

const FileUpload = ({ form }) => {
  const [files, setFiles] = useState([]);
  const [filesURL, setFilesURL] = useState([]);

  useEffect(() => {
    form.setValue("images", []);
  }, []);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const maxSize = 1024 * 1024;
    const validTypes = ["image/png", "image/jpeg", "image/jpg"];

    const validFiles = selectedFiles.filter((file) => {
      const isValidType = validTypes.includes(file.type);
      const isValidSize = file.size <= maxSize;

      if (!isValidType) {
        form.setError("image", {
          type: "manual",
          message: "Only .png and .jpg images are accepted.",
        });
      } else if (!isValidSize) {
        form.setError("image", {
          type: "manual",
          message: "Image must be less than 1MB.",
        });
      }

      return isValidType && isValidSize;
    });

    if (validFiles.length === 0) return;

    const uniqueFiles = [
      ...new Map(
        [...validFiles, ...files].map((file) => [
          `${file.name}_${file.size}`,
          file,
        ]),
      ).values(),
    ];

    setFiles(uniqueFiles);
    setFilesURL(uniqueFiles.map((file) => URL.createObjectURL(file)));
    form.setValue("images", uniqueFiles, { shouldValidate: true });
    form.clearErrors("images");
  };

  useEffect(() => {
    return () => {
      filesURL.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [filesURL]);

  return (
    <div className="flex space-x-6">
      <div className="flex-1">
        <div
          className={cn(
            "border-muted-foreground hover:border-accent-foreground relative flex aspect-square h-30 items-center justify-center rounded-lg border-2 border-dashed",
            form.formState.errors.image &&
              "border-destructive/20 dark:border-destructive/40",
          )}
        >
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="absolute h-full w-full cursor-pointer opacity-0"
          />
          <ImageUp className="text-secondary-foreground size-8" />
        </div>
      </div>

      <div
        className={cn(
          "flex w-full space-x-2 overflow-x-scroll",
          filesURL.length > 0 ? "justify-start" : "justify-center",
        )}
      >
        {filesURL.length > 0 ? (
          filesURL.map((image, index) => (
            <img
              src={image}
              key={index}
              alt={`image ${index}`}
              className="aspect-square h-30 rounded-lg object-cover"
            />
          ))
        ) : (
          <p className="text-secondary-foreground self-center text-sm">
            No images selected
          </p>
        )}
      </div>
    </div>
  );
};

function RoomForm({ onSubmit: externalOnSubmit, isLoading, defaultValues }) {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(roomSchema),
    defaultValues: defaultValues || {
      images: [],
      name: "",
      capacity: 0,
      pricing: 0,
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
          name="images"
          render={() => (
            <FormItem>
              <FormLabel>Room Images</FormLabel>
              <FormControl>
                <FileUpload form={form} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
          name="pricing"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pricing*</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the price per hour"
                  type="number"
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
                <Input placeholder="Enter amenities" type="text" {...field} />
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
                  {/* <SelectItem value="Booked">Booked</SelectItem> */}
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-3">
          <Button type="submit" className="w-40" disabled={isLoading}>
            {buttonLabel(
              isLoading,
              <>
                <Save className="mr-2 h-4 w-4" />
                Submit
              </>,
            )}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate(-1)}
            disabled={isLoading}
          >
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default RoomForm;
