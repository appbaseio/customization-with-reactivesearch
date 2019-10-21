import React from "react";
import { Link, withRouter } from "react-router-dom";

const Navbar = props => {
  const items = [
    {
      path: "/",
      text: "Map View"
    },
    {
      path: "/custom-component",
      text: "Custom Components"
    },
    {
      path: "/interactions",
      text: "Custom Interactions"
    }
  ];
  return (
    <nav>
      {items.map(item => (
        <Link
          to={item.path}
          key={item.path}
          className={item.path === props.location.pathname ? "active" : ""}
        >
          {item.text}
        </Link>
      ))}
      <a
        className="logo"
        href="https://appbase.io"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by ReactiveSearch
      </a>
    </nav>
  );
};

export default withRouter(Navbar);
