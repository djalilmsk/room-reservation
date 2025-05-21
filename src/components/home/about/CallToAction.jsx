import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/ui/section";
import { Separator } from "@/components/ui/separator";
import { Rocket, HandshakeIcon } from "lucide-react";
import { Link } from "react-router-dom";

function CallToAction() {
  return (
    <div className="bg-secondary/50 rounded-xl p-8">
      <SectionTitle className="mb-5 text-center">Call to Action</SectionTitle>
      <div className="bg-secondary/20 rounded-xl p-8 shadow-sm">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex items-center gap-6 sm:w-1/2">
            <div className="bg-secondary rounded-full p-3">
              <Rocket className="text-primary h-8 w-8" />
            </div>
            <div className="flex flex-col">
              <p className="font-semibold sm:text-lg">Ready to book smarter?</p>
              <Button className="mt-3 w-fit">
                <Link to="/rooms">Explore Now</Link>
              </Button>
            </div>
          </div>

          <div className="bg-border h-[1px] w-40 sm:h-20 sm:w-[1px]" />

          <div className="flex items-center gap-4 sm:w-1/2">
            <div className="bg-secondary rounded-full p-3">
              <HandshakeIcon className="text-primary h-8 w-8" />
            </div>
            <div className="flex flex-col">
              <p className="font-semibold sm:text-lg">
                Let's talk about your team's needs
              </p>
              <Button className="mt-3 w-fit">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CallToAction;
