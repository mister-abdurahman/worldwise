import React from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import Logo from "./Logo";

export default function NavBar() {
  return (
    <nav className={styles.nav}>
      <Link to={"/"}>
        <Logo />
      </Link>
      <ul>
        <li>
          <NavLink to={"/pricing"}>Pricing</NavLink>
        </li>
        <li>
          <NavLink to={"/product"}>Product</NavLink>
        </li>
        <li>
          <NavLink to={"/login"} className={styles.ctaLink}>Log In</NavLink>
        </li>
      </ul>
    </nav>
  );
}
