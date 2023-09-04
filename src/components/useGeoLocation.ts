import { useState } from "react";

export function useGeoLocation(defaultPos = null) {
  const [position, setPosition] = useState<any>(defaultPos);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  function getPosition() {
    if (!navigator.geolocation)
      return setIsError("Your browser does not suppport geolocation");
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setIsLoading(false);
      },
      (error) => {
        setIsError(error.message);
        setIsLoading(false);
      }
    );
  }
  return { position, isLoading, isError, getPosition };
}
