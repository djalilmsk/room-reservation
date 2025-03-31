import { NavLink } from 'react-router-dom';

const NAV_LINKS = [
  { id: 1, to: '/#', label: 'Home' },
  { id: 2, to: '/Rooms', label: 'Rooms' },
  { id: 3, to: '/About', label: 'About' },
  { id: 4, to: '/Contact', label: 'Contact' },
];

function NavLinks({ className = '', oneLinkClasses = '', children }) {
  return (
    <ul className={className}>
      {children}
      {NAV_LINKS.map(({ id, to, label }) => (
        <li key={id} className={oneLinkClasses}>
          <NavLink to={to}>
            {label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default NavLinks;