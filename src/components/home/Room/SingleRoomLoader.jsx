import { Page } from "@/components/ui/page";
import RoomBookingLoader from "./RoomBookingLoader";
import HomeFooter from "../Footer";
import { Section } from "@/components/ui/section";

function SingleRoomLoader() {
  return (
    <Page className="flex min-h-screen flex-col justify-between sm:space-y-18 sm:pt-10 lg:space-y-24">
      <Section>
        <div className="flex gap-5 max-lg:flex-col">
          <div className="bg-secondary-foreground/16 h-60 w-full animate-pulse rounded-lg object-cover max-lg:h-60 lg:h-96 lg:w-1/2" />
          <div className="flex w-full flex-col justify-between gap-8">
            <div className="w-full space-y-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="bg-secondary-foreground/16 mb-2 h-6 w-40 animate-pulse rounded" />
                  <div className="bg-secondary-foreground/16 h-4 w-60 animate-pulse rounded" />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="bg-secondary-foreground/16 h-6 w-10 animate-pulse rounded" />
                </div>
              </div>
              <div className="w-full space-y-3">
                <div className="flex items-center justify-between text-lg">
                  <div className="bg-secondary-foreground/16 h-6 w-16 animate-pulse rounded" />
                  <div className="bg-secondary-foreground/16 h-6 w-16 animate-pulse rounded" />
                </div>
                <div className="bg-secondary-foreground/10 my-5 h-px w-full" />
                <div className="flex items-center justify-between text-lg">
                  <div className="bg-secondary-foreground/16 h-6 w-20 animate-pulse rounded" />
                  <div className="bg-secondary-foreground/16 h-6 w-20 animate-pulse rounded" />
                </div>
                <div className="bg-secondary-foreground/10 my-5 h-px w-full" />
                <div className="flex items-center justify-between text-lg">
                  <div className="bg-secondary-foreground/16 h-6 w-16 animate-pulse rounded" />
                  <div className="bg-secondary-foreground/16 h-6 w-16 animate-pulse rounded" />
                </div>
                <div className="bg-secondary-foreground/10 my-5 h-px w-full" />
                <div className="flex items-center justify-between text-lg">
                  <div className="bg-secondary-foreground/16 h-6 w-16 animate-pulse rounded" />
                  <div className="flex gap-2">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="bg-secondary-foreground/16 h-6 w-16 animate-pulse rounded"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-secondary-foreground/16 h-12 w-full animate-pulse rounded" />
          </div>
        </div>
        <RoomBookingLoader />
      </Section>
      <HomeFooter />
    </Page>
  );
}

export default SingleRoomLoader;
