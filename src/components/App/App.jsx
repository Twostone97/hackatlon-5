import React, { useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import Flight from "../Flight/Flight.jsx";

const App = () => {
  const [flights, setflights] = useState([]);
  const [from, setFrom] = useState("VAL");
  const [to, setTo] = useState("PRG");
  const [loading, setLoading] = useState(false);
  const [directFlight, setDirectFlight] = useState(0);
  const [activePage, setActivePage] = useState(0);

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
      `https://api.skypicker.com/flights?fly_from=${from}&fly_to=${to}&date_from=05/07/2019&date_to=06/08/2019&direct_flights=${directFlight}`
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
  const handleDirect = e => {
    setDirectFlight(e.target.checked ? 1 : 0);
    // console.log(e.target.checked);
  };
  const handlePageChangeup = () => {
    setActivePage(prevState => {
      if (prevState + 5 > flights.length) {
        return prevState;
      } else {
        return prevState + 5;
      }
    });
  };

  const handlePageChangedown = () => {
    setActivePage(prevState => {
      if (prevState < 4) {
        return (prevState = 0);
      } else {
        return prevState - 5;
      }
    });
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
      <input type="checkbox" onChange={handleDirect} />
      <button onClick={getFlight}>SEARCH</button> <br />
      {loading ? (
        "LOADING"
      ) : (
        <>
          <Flight flights={flights} activePage={activePage} />
          <button onClick={handlePageChangedown}>-</button>
          <button onClick={handlePageChangeup}>+</button>
        </>
      )}
    </>
  );
};

export default App;
