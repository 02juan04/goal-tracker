import "./nav.css";
import { NavLink } from "react-router-dom";

const navOptions = [
  { label: "Home", path: "/" },
  { label: "Profile", path: "/Profile" },
  { label: "Archived", path: "/Archived" },
];

export default function Nav() {
  return (
    <nav className="flex justify-center mb-6">
      <ul className="flex gap-10">
        {navOptions.map((item) => (
          <li key={item.label} className="navOptionContainer">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "inline-block border-b scale-150 transition-transform"
                  : ""
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
