import React, { useState, useEffect } from "react";

import Flight from "../Flight/Flight.jsx";

const App = () => {
  const [flights, setflights] = useState([]);
  const [from, setFrom] = useState("VAL");
  const [to, setTo] = useState("PRG");

  const fromList = {
    Valencia: "VAL",
    Barcelona: "BAR",
    Madrid: "MAD",
    Milano: "MIL",
    Athens: "ATH"
  };

  const toList = {
    Prague: "PRG",
    Berlin: "BER",
    Warsaw: "WAW",
    Pardubice: "PED"
  };

  const getFlight = () => {
    fetch(
      `https://api.skypicker.com/flights?fly_from=${from}&fly_to=${to}&date_from=05/07/2019&date_to=06/07/2019`
    )
      .then(resp => resp.json())
      .then(({ data }) => {
        const detailsOfFlight = data.map((flight, index) => ({
          departureTime: flight.dTime,
          arrivalTime: flight.aTime,
          from: flight.cityFrom,
          to: flight.cityTo,
          price: flight.price,
          key: index
        }));
        setflights(detailsOfFlight);
      });
  };

  useEffect(() => {
    getFlight();
  }, []);

  if (flights.length === 0) {
    return "LOADING";
  }

  const handleFrom = e => {
    // setFrom(e.target.value);
    setFrom(fromList[e.target.value]);
  };

  const handleTo = e => {
    setTo(toList[[e.target.value]]);
  };

  return (
    <>
      <select name="fromList" onChange={handleFrom}>
        {Object.keys(fromList).map((item, index) => (
          <option key={`fromOption-${index}`}>{item}</option>
        ))}
      </select>

      <select name="toList" onChange={handleTo}>
        {Object.keys(toList).map((item, index) => (
          <option key={`toOption-${index}`}>{item}</option>
        ))}
      </select>

      <button onClick={getFlight}>SEARCH</button>
      <Flight flights={flights} />
    </>
  );
};

export default App;
