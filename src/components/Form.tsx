// // "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useReducer } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
// import "react-datepicker/dist/react-datepicker-cssmodules.css";

import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { UseUrlPosition } from "./useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCities } from "../contexts/CitiesContext";

export function convertToEmoji(countryCode: any) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char: any) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

interface locationDetailsProps {
  cityName: string;
  countryName: string;
  date: Date;
  notes: string;
  emoji: string;
  loading: boolean;
  error: string;
}

const BASE_URL = `https://api.bigdatacloud.net/data/reverse-geocode-client`;

const initialData = {
  cityName: "",
  countryName: "",
  date: new Date(),
  notes: "",
  emoji: "",
  loading: false,
  error: "",
};
function reducer(state: locationDetailsProps, action: any) {
  switch (action.type) {
    case "setCity":
      return { ...state, cityName: action.payload };
    case "setCountry":
      return { ...state, countryName: action.payload };
    case "setDate":
      return { ...state, date: action.payload };
    case "setNotes":
      return { ...state, notes: action.payload };
    case "setEmoji":
      return { ...state, emoji: convertToEmoji(action.payload) };
    case "setLoading":
      return { ...state, loading: action.payload };
    case "setError":
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

function Form() {
  const { lat: mapLat, lng: mapLng } = UseUrlPosition();

  const [locationDetails, dispatch] = useReducer(reducer, initialData);
  const { cityName, countryName, emoji, notes, date, loading, error } =
    locationDetails;

  const navigate = useNavigate();

  useEffect(
    function () {
      if (!mapLat && !mapLng) return;
      async function fetchCityData() {
        try {
          dispatch({ type: "setLoading", payload: true });
          dispatch({ type: "setError", payload: "" });
          const res = await fetch(
            `${BASE_URL}?latitude=${mapLat}&longitude=${mapLng}`
          );
          const resJSON = await res.json();

          if (!resJSON.countryCode)
            throw new Error(
              "That doesn't seem to be a city. Click somewhere else 😉"
            );
          dispatch({
            type: "setCity",
            payload: resJSON.cityName || resJSON.locality || "",
          });
          dispatch({ type: "setCountry", payload: resJSON.countryName });
          dispatch({ type: "setEmoji", payload: resJSON.countryCode });
        } catch (error: any) {
          dispatch({ type: "setError", payload: error.message });
        } finally {
          dispatch({ type: "setLoading", payload: false });
        }
      }
      fetchCityData();
    },
    [mapLat, mapLng]
  );

  const { createCity, isLoading }: any = useCities();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country: countryName,
      emoji,
      date,
      notes,
      position: { lat: mapLat, lng: mapLng },
    };
    await createCity(newCity);
    navigate("/app/cities");
  }

  if (!mapLat && !mapLng)
    return <Message message={"Start by clicking somewhere on the map 🙂"} />;

  if (loading) return <Spinner />;
  if (error) return <Message message={error} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={(e: React.FormEvent) => handleSubmit(e)}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) =>
            dispatch({ type: "setCity", payload: e.target.value })
          }
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => dispatch({ type: "setDate", payload: date })}
          dateFormat={"dd/MM/yyyy"}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) =>
            dispatch({ type: "setNotes", payload: e.target.value })
          }
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type={"primary"}>Add</Button>
        <Button
          type={"back"}
          onClick={(e: Event) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
