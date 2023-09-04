import React from "react";
import styles from "./CountryItem.module.css";

export default function CountryItem({ country }: any) {
  const { name, emoji } = country;
  return (
    <li className={styles.countryItem}>
      <span>{emoji}</span>
      <span>{name}</span>
    </li>
  );
}
