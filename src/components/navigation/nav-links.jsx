import { ChevronDown } from "lucide-react";
import { NavLink } from "react-router-dom";
import { ModeToggle } from "../ui/mode-toggle";
import { Button } from "../ui/button";

const NAV_LINKS = [
  { id: 1, to: "/#", label: "Home" },
  { id: 2, to: "/rooms", label: "Rooms" },
  { id: 3, to: "/about", label: "About" },
  { id: 4, to: "/contact", label: "Contact" },
];

function NavLinks({
  className = "",
  oneLinkClasses = "",
  children,
  innerRef = null,
}) {
  return (
    <ul ref={innerRef} className={className}>
      {children}
      {NAV_LINKS.map(({ id, to, label }) => (
        <NavLink key={id} className={oneLinkClasses} to={to}>
          <li>{label}</li>
        </NavLink>
      ))}
      <li className={oneLinkClasses}>
        <ModeToggle>
          <p className={`flex cursor-pointer`}>Theme</p>
        </ModeToggle>
      </li>
    </ul>
  );
}

export default NavLinks;
