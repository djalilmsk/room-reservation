import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/ui/section";
import UserAvatar from "@/components/user/UserAvatar";
import { useUser } from "@/hooks/useUser";
import { Pen } from "lucide-react";
import ProfileForm from "@/components/dashboard/forms/profile-form";

function Preview({ data }) {
  return (
    <div className="relative flex items-center justify-between overflow-hidden rounded-xl p-4 @container">
      <div className="flex items-center gap-3">
        <div className="bg-secondary absolute top-0 left-0 h-full w-full opacity-70" />
        <UserAvatar className="size-12" moreLinks={false} />
        <div className="z-1">
          <span className="text-md flex gap-2 font-bold">
            <h4>{data.firstName}</h4>
            <h4>{data.lastName}</h4>
          </span>
          <span>
            <p className="text-secondary-foreground text-xs">{data.email}</p>
          </span>
        </div>
      </div>
      <Button>
        {" "}
        <Pen className="size-4" /> <span className="@max-xs:hidden">Edit Image</span>
      </Button>
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
