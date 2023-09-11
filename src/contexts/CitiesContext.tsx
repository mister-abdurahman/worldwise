import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

interface cityType {
  cityName: string;
  country: string;
  date: Date;
  notes: string;
  emoji: string;
}
interface reducerActionType {
  type: string;
  payload: any;
}
interface initialDataType {
  cities: cityType[];
  isLoading: boolean;
  error: string;
  currentCity: string;
}

export const BASE_URL = `http://localhost:8000`;

const citiesContext = createContext({});

const initialData = {
  cities: [],
  isLoading: false,
  error: "",
  currentCity: "",
};

const reducer = (state: initialDataType, action: reducerActionType) => {
  switch (action.type) {
    case "setCities":
      return { ...state, cities: action.payload };
    case "addNewCity":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "setLoading":
      return { ...state, isLoading: action.payload };
    case "setError":
      return { ...state, error: action.payload };
    case "setCurrentCity":
      return { ...state, currentCity: action.payload };
    case "deleteCity":
      return {
        ...state,
        cities: state.cities.filter((city: any) => city.id !== action.payload),
        currentCity: {},
      };

    default:
      throw new Error("Unexpected action");
  }
};

function CitiesProvider({ children }: any) {
  const [contextData, dispatch] = useReducer(reducer, initialData);
  const { cities, isLoading, error, currentCity } = contextData;
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState("");

  // const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      try {
        dispatch({ type: "setLoading", payload: true });
        dispatch({ type: "setError", payload: "" });
        // setError("");
        const res = await fetch(`${BASE_URL}/cities`);
        const resJSON = await res.json();
        if (!res.ok)
          throw new Error((resJSON && resJSON.message) || res.status);
        dispatch({ type: "setCities", payload: resJSON });
        // setCities(resJSON);
      } catch (error: any) {
        dispatch({ type: "setError", payload: "" });
        // setError(error);
        alert("There was an error loading data...");
      } finally {
        dispatch({ type: "setLoading", payload: false });
        // setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id: string) {
      try {
        if (Number(id) === currentCity.id) return; //dont fetch if already the selected city
        dispatch({ type: "setLoading", payload: true });
        dispatch({ type: "setError", payload: "" });
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const resJSON = await res.json();
        if (!res.ok)
          throw new Error((resJSON && resJSON.message) || res.status);
        dispatch({ type: "setCurrentCity", payload: resJSON });
      } catch (error: any) {
        dispatch({ type: "setError", payload: error });
        alert("There was an error loading data...");
      } finally {
        // setIsLoading(false);
        dispatch({ type: "setLoading", payload: false });
      }
    },
    [currentCity.id]
  );

  // save new city to Fake API
  async function createCity(newCity: cityType) {
    try {
      // setIsLoading(true);
      dispatch({ type: "setLoading", payload: true });
      dispatch({ type: "setError", payload: "" });
      // setError("");
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });
      const resJSON = await res.json();
      if (!res.ok) throw new Error((resJSON && resJSON.message) || res.status);
      // setCities((prevCities): any => [...prevCities, resJSON]);
      dispatch({ type: "addNewCity", payload: resJSON });
    } catch (error: any) {
      dispatch({ type: "setError", payload: error });
      // setError(error);
      alert("There was an error saving data to API");
    } finally {
      // setIsLoading(false);
      dispatch({ type: "setLoading", payload: false });
    }
  }

  async function deleteCity(id: string) {
    try {
      // setError("");
      dispatch({ type: "setLoading", payload: true });
      dispatch({ type: "setError", payload: "" });
      // setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      const resJSON = await res.json();
      if (!res.ok) throw new Error((resJSON && resJSON.message) || res.status);
      // setCities((prevCities): any =>
      //   prevCities.filter((city: any) => city.id !== id)
      // );
      dispatch({ type: "deleteCity", payload: id });
    } catch (error: any) {
      // setError(error);
      dispatch({ type: "setError", payload: error });
      alert("There was an error deleting data from API");
    } finally {
      dispatch({ type: "setLoading", payload: false });
      // setIsLoading(false);
    }
  }

  return (
    <citiesContext.Provider
      value={{
        cities,
        // setCities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
        error,
      }}
    >
      {children}
    </citiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(citiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider"); //incase we try to access the context outside of the children prop.
  return context;
}

export { CitiesProvider, useCities };
