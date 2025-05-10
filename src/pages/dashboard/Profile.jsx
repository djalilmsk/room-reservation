import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser";
import { Pen, Save } from "lucide-react";
import ProfileForm from "@/components/dashboard/forms/profile-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ImageForm, ThirdContent } from "@/components/auth/forms/image-form";
import { formSchema } from "@/utils/forms/update-profile-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useProfileMutation } from "@/hooks/mutation/useProfileMutation";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { defaults } from "@/utils/format/toast-styles";
import { login } from "@/utils/redux/user";
import { buttonLabel } from "@/components/ui/button-label";
import { localFetch } from "@/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const imageSchema = formSchema.pick({
  image: true,
});

function Preview({ data }) {
  const dispatch = useDispatch();
  const { image, id, firstName, lastName, email } = data;
  const fallback =
    `${firstName.split("")[0]}${lastName.split("")[0]}`.toUpperCase();

  const form = useForm({
    resolver: zodResolver(imageSchema),
    defaultValues: {
      image: null,
    },
  });

  const { mutate, isPending } = useProfileMutation(id);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data.image);
    mutate(formData, {
      onSuccess: (data) => {
        form.reset();
        dispatch(login({ data: data.data.dataValues }));
        toast.success("Profile image updated successfully", {
          style: defaults,
        });
      },
      onError: () => {
        toast.error("Failed to update profile image", {
          style: defaults,
        });
      },
    });
  };

  const onError = () => {
    toast.error("Failed to update profile image", {
      style: defaults,
    });
  };

  return (
    <div className="@container relative flex items-center justify-between overflow-hidden rounded-xl p-4">
      <div className="flex items-center gap-3">
        <div className="bg-secondary absolute top-0 left-0 h-full w-full opacity-70" />
        <div className="z-2 overflow-hidden rounded-full">
          <Avatar className="flex size-12 items-center justify-center">
            <AvatarImage src={image} />
            <AvatarFallback>{fallback}</AvatarFallback>
          </Avatar>
        </div>
        <div className="z-1">
          <span className="text-md flex gap-2 truncate font-bold @max-sm:w-35">
            <h4>{firstName}</h4>
            <h4>{lastName}</h4>
          </span>
          <span>
            <p className="text-secondary-foreground text-xs">{email}</p>
          </span>
        </div>
      </div>

      <Dialog model={false}>
        <DialogTrigger className="z-1" asChild>
          <Button>
            <Pen className="size-4" />
            <span className="@max-xs:hidden">Edit Image</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile picture</DialogTitle>
            <DialogDescription>
              Change to your image here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <ImageForm
            form={form}
            onSubmit={onSubmit}
            onError={onError}
            isPending={isPending}
          >
            <Button type="submit" className="w-full" disabled={isPending}>
              {buttonLabel(
                isPending,
                <>
                  <Save className="h-4 w-4" />
                  save changes
                </>,
              )}
            </Button>
          </ImageForm>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Profile() {
  const { data } = useUser();

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Personal Information</h1>
      <Preview data={data} />
      <ProfileForm />
    </div>
  );
}

export default Profile;
