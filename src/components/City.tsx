import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";
import styles from "./City.module.css";
import Spinner from "./Spinner";
// import Button from "./Button";
import BackButton from "./BackButton";

export default function City() {
  const { id } = useParams();
  const { getCity }: any = useCities();

  useEffect(
    function () {
      getCity(id);
    },
    [id]
  );
  const { currentCity, isLoading }: any = useCities();
  const { cityName, emoji, date, notes } = currentCity;

  if (isLoading) return <Spinner />;
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <h5>City Name</h5>
        <h3>
          {emoji} {cityName}
        </h3>
      </div>
      <div className={styles.row}>
        <h5>You went to {cityName} on</h5>
        <h3>{date}</h3>
      </div>
      <div className={styles.row}>
        <h5>Comment</h5>
        <h3>{notes}</h3>
      </div>
      <div className={styles.row}>
        <h5>Learn more</h5>
        <NavLink to={"#"}>
          <h3>Checkout {cityName} on wikipedia &rarr;</h3>
        </NavLink>
      </div>
      <BackButton />
    </div>
  );
}
