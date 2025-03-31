import { useRef, useState } from "react"; // Add useState for the file
import { Upload, X } from "lucide-react";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/utils/forms/signup-schema";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const imageSchema = formSchema.pick({
  image: true,
});

export function ThirdContent() {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(imageSchema),
    defaultValues: {
      image: null,
    },
  });

  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setFile(imageUrl);
      form.setValue("image", selectedFile, { shouldValidate: true });
    }

    if (!["image/png", "image/jpeg", "image/jpg"].includes(selectedFile.type))
      handleFileDelete(event);
  };

  const handleFileDelete = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setFile(null);
    form.setValue("image", null, { shouldValidate: true });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = (data) => {
    console.log("Form submitted with data:", data);
    navigate("/auth/signup/extra-data");
  };

  const onError = (errors) => {
    if (errors.image.message === "")
      navigate("/auth/signup/extra-data");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <div className="relative mx-auto flex w-full max-w-xl cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6">
                {field.value ? (
                  <div className="relative">
                    <button
                      type="button"
                      className="bg-destructive text-primary-foreground absolute -top-2 -right-2 z-50 h-5 w-5 rounded-full p-1"
                      onClick={handleFileDelete}
                    >
                      <X className="h-3 w-3" />
                    </button>
                    <img
                      src={file}
                      alt="Uploaded preview"
                      className="max-h-40 rounded-md object-contain"
                    />
                  </div>
                ) : (
                  <>
                    <Upload className="text-secondary-foreground m-3 h-10 w-10" />
                    <p className="text-secondary-foreground">
                      Click or Drag to upload an image
                    </p>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  name="image"
                  className="absolute h-full w-full cursor-pointer opacity-0"
                  onChange={handleFileChange}
                />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          Next
        </Button>
      </form>
    </Form>
  );
}
