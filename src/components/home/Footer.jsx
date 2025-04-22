import Footer from "@/components/auth/auth-footer";
import logo from "@/assets/Logo.svg";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

function HomeFooter() {
  return (
    <footer className="relative">
      <div className="bg-muted-foreground/5 absolute top-0 left-1/2 grid h-full w-dvw -translate-x-1/2" />
      <div className="flex grid-cols-1 flex-wrap gap-10 pt-10 md:grid md:grid-cols-5 md:gap-4 md:pt-16">
        <div className="col-span-2 max-md:w-full">
          <img src={logo} alt="ROOM" className="mb-4 w-24 text-center" />
        </div>
        <div className="space-y-6 max-sm:w-full">
          <h2 className="text-sm font-semibold">Learn More</h2>
          <div className="flex flex-wrap gap-3 sm:flex-col">
            <Link
              to="about"
              className="text-secondary-foreground cursor-pointer text-sm"
            >
              About Us
            </Link>
            <Link
              to="#"
              className="text-secondary-foreground cursor-pointer text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              to="#"
              className="text-secondary-foreground cursor-pointer text-sm"
            >
              Terms
            </Link>
            <Link
              to="#"
              className="text-secondary-foreground cursor-pointer text-sm"
            >
              Contact Us{" "}
            </Link>
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-sm font-semibold">Contact Us</h2>
          <div className="flex flex-col gap-3">
            <div className="text-secondary-foreground text-sm">
              Booking Reservation: <br />
              <p className="text-popover-foreground mt-1">123-123-1234</p>
            </div>
            <div className="text-secondary-foreground text-sm">
              Customer service: <br />
              <p className="text-popover-foreground mt-1">123-123-1234</p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-sm font-semibold">Social Media</h2>
          <div className="flex flex-col gap-3">
            <Link
              to="#"
              className="text-secondary-foreground flex items-center justify-start gap-3 text-sm"
            >
              <Facebook className="size-5" /> Facebook
            </Link>
            <Link
              to="#"
              className="text-secondary-foreground flex items-center justify-start gap-3 text-sm"
            >
              <Instagram className="size-5" />
              Instagram
            </Link>
            <Link
              to="#"
              className="text-secondary-foreground flex items-center justify-start gap-3 text-sm"
            >
              <Twitter className="size-5" />
              Twitter
            </Link>
            <Link
              to="#"
              className="text-secondary-foreground flex items-center justify-start gap-3 text-sm"
            >
              <Linkedin className="size-5" />
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
      <div className="relative mt-10 flex w-full justify-center py-4 md:mt-16">
        <div className="bg-border absolute top-0 left-1/2 grid h-[1px] w-dvw -translate-x-1/2" />
        <p className="text-secondary-foreground text-sm">
          Copyright &copy; 2025 • ROOM.
        </p>
      </div>
    </footer>
  );
}

export default HomeFooter;
