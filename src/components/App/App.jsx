import React, { useState, useEffect } from "react";

import Flight from "../Flight/Flight.jsx";

const App = () => {
  const [flights, setflights] = useState([]);
  const [from, setFrom] = useState("VAL");
  const [to, setTo] = useState("PRG");
  const [loading, setLoading] = useState(false);

  const fromList = {
    Valencia: "VAL",
    Barcelona: "BCN",
    Madrid: "MAD",
    Milano: "MIL",
    Athens: "ATH"
  };

  const toList = {
    Prague: "PRG",
    Berlin: "BER",
    Warsaw: "WMI",
    Pardubice: "PED"
  };

  const getFlight = () => {
    setLoading(true);
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
        setLoading(false);
      })
      .catch(console.log);
  };

  useEffect(() => {
    getFlight();
  }, []);

  const handleFrom = e => {
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
      <button onClick={getFlight}>SEARCH</button> <br />
      {loading ? "LOADING" : <Flight flights={flights} />}
    </>
  );
};

export default App;
