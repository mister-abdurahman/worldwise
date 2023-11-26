import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import Logo from "./Logo";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdCancel } from "react-icons/md";

export default function NavBar() {
  const [showHamburgerContent, setshowHamburgerContent] = useState(false);
  return (
    <nav className={styles.nav}>
      <Link to={"/"}>
        <Logo />
      </Link>
      <ul className={styles.nav_content}>
        <li>
          <NavLink to={"/pricing"}>Pricing</NavLink>
        </li>
        <li>
          <NavLink to={"/product"}>Product</NavLink>
        </li>
        <li>
          <NavLink to={"/login"} className={styles.ctaLink}>
            Log In
          </NavLink>
        </li>
      </ul>

      {showHamburgerContent ? (
        <MdCancel
          className={styles.hamburger}
          onClick={() => setshowHamburgerContent((prev) => false)}
        />
      ) : (
        <GiHamburgerMenu
          className={styles.hamburger}
          onClick={() => setshowHamburgerContent((prev) => true)}
        />
      )}

      {showHamburgerContent && (
        <ul className={styles.hamburger_content}>
          <li>
            <NavLink to={"/pricing"}>Pricing</NavLink>
          </li>
          <li>
            <NavLink to={"/product"}>Product</NavLink>
          </li>
          <li className={styles.hamburger_cta}>
            <NavLink to={"/login"}>Log In</NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
}
