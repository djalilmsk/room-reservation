import { Link } from "react-router-dom";
import { Separator } from "../ui/separator";

function Footer() {
  const links = [
    { label: "About us", link: "#" },
    { label: "Contact us", link: "#" },
    { label: "Help", link: "#" },
    { label: "Privacy Policy", link: "#" },
    { label: "What We Offer", link: "#" },
  ];
  return (
    <footer className="xl:w-6xl max-xl:w-[90%] mx-auto pb-5">
      <Separator />
      <div className="flex items-end justify-between pt-5 max-md:justify-center">
        <div className="flex justify-between gap-8 text-sm max-md:hidden lg:gap-14">
          {links.map(({ index, label, link }) => {
            return (
              <Link key={label} to={link}>
                {label}
              </Link>
            );
          })}
        </div>
        <p className="text-secondary-foreground text-sm">
          Copyright &copy; 2025 • ROOM.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
