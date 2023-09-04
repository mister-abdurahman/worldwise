import React, { useEffect } from "react";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";

function dateFormat(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export default function CityItem({ city }: any) {
  const { cityName, emoji, date, id, position } = city;
  const { lat, lng } = position;

  const { currentCity, deleteCity }: any = useCities();

  // useEffect(function(){
  //   handleDeleteBtn
  // }, [])

  async function handleDeleteBtn(e: React.FormEvent) {
    e.preventDefault();
    await deleteCity(id);
  }

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id && styles["cityItem--active"]
        }`}
        to={`${id}?lat=${lat}&lng=${lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <p className={styles.date}>{dateFormat(date)}</p>
        <button className={styles.deleteBtn} onClick={handleDeleteBtn}>
          &times;
        </button>
      </Link>
    </li>
  );
}
