import React from "react";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";

export default function CountryList() {
  const { cities, isLoading }: any = useCities();
  const countries = cities.reduce((acc: any, cur: any) => {
    if (acc.map((accEl: any) => accEl.name).includes(cur.country)) return acc;
    else acc.push({ name: cur.country, emoji: cur.emoji });
    return acc;
    // else acc.push(cur.country);
  }, []);

  if (isLoading) return <Spinner />;

  if (countries.length < 1)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  return (
    <ul className={styles.countryList}>
      {countries.map((country: any) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}
