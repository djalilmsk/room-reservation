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
    <footer className="pb-5 border-t-1">
      {/* <Separator /> */}
      <div className="mx-auto flex items-end justify-between pt-5 max-xl:w-[90%] max-md:justify-center xl:w-6xl">
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
