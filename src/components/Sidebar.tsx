import React from "react";
import Logo from "./Logo";
import Footer from "./Footer";
import styles from "./Sidebar.module.css";
import AppNav from "./AppNav";
import { Outlet } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <span className={styles.mobile_applayout_logo}>
        <Logo />
      </span>
      <span className={styles.mobile_applayout_appnav}>
        <AppNav />
      </span>
      <Outlet />
      <Footer />
    </div>
  );
}
