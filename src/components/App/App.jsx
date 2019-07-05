import React, { useState, useEffect } from "react";

import Flight from "../Flight/Flight.jsx";

const App = () => {
  const [flights, setflights] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.skypicker.com/flights?fly_from=PRG&fly_to=LON&date_from=05/07/2019&date_to=06/07/2019`
    )
      .then(resp => resp.json())
      .then(({ data }) => {
        const detailsOfFlight = data.map(flight => ({
          departureTime: flight.dTime,
          arrivalTime: flight.aTime,
          from: flight.cityFrom,
          to: flight.cityTo,
          price: flight.price
        }));
        setflights(detailsOfFlight);
      });
  }, []);

  if (flights.length === 0) {
    return "LOADING";
  }

  console.log(flights);

  return (
    <>
      <Flight flights={flights} />
    </>
  );
};

export default App;
