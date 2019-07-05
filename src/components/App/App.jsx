import React, { useState, useEffect } from "react";
import Flight from "../Flight/Flight.jsx";

const App = () => {
  const [flights, setflights] = useState([]);
  const [from, setFrom] = useState("VAL");
  const [to, setTo] = useState("PRG");
  const [loading, setLoading] = useState(false);
  const [directFlight, setDirectFlight] = useState(0);
  const [activePage, setActivePage] = useState(0);
  const [textInputFrom, setTextInputFrom] = useState("");
  const [textInputTo, setTextInputTo] = useState("");
  const [jump, setJump] = useState(5);

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

  const getFlight = (fromCode, toCode) => {
    setLoading(true);
    fetch(
      `https://api.skypicker.com/flights?fly_from=${fromCode}&fly_to=${toCode}&date_from=05/07/2019&date_to=06/08/2019&direct_flights=${directFlight}`
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
      if (prevState + jump > flights.length) {
        return prevState;
      } else {
        return prevState + jump;
      }
    });
  };

  const handlePageChangedown = () => {
    setActivePage(prevState => {
      if (prevState < jump - 1) {
        return 0;
      } else {
        console.log("jump type", typeof jump);
        return prevState - jump;
      }
    });
  };
  const handleJump = step => {
    setJump(step);
  };
  const handleTypingFrom = e => {
    setTextInputFrom(e.target.value);
    // console.log(e.target.value);
  };
  const handleTypingTo = e => {
    setTextInputTo(e.target.value);
    // console.log(e.target.value);
  };
  const getCityCode = async () => {
    let to, from;
    fetch(`https://api.skypicker.com/locations?term=${textInputFrom}&limit=1`)
      .then(resp => resp.json())
      .then(cityCodeFrom => cityCodeFrom.locations[0].code)
      .then(data => {
        console.log("input From");
        from = data;
        fetch(`https://api.skypicker.com/locations?term=${textInputTo}&limit=1`)
          .then(resp => resp.json())
          .then(cityCodeTo => cityCodeTo.locations[0].code)
          .then(data => {
            console.log("input to");
            to = data;
            getFlight(from, to);
          });
      });
  };

  return (
    <>
      <div className="inputs">
        <label htmlFor="text">From:</label>
        <input type="text" onChange={handleTypingFrom} />
        <label htmlFor="text">To:</label>
        <input type="text" onChange={handleTypingTo} />
        <input type="checkbox" onChange={handleDirect} />
        <button onClick={getCityCode}>SEARCH</button> <br />
      </div>
      {loading ? (
        "LOADING"
      ) : (
        <>
          <Flight flights={flights} activePage={activePage} jump={jump} />
          <div className="pages">
            <button onClick={handlePageChangedown}>◄</button>
            <button onClick={handlePageChangeup}>►</button>
            <button
              onClick={() => {
                handleJump(5);
              }}
            >
              5
            </button>
            <button
              onClick={() => {
                handleJump(10);
              }}
            >
              10
            </button>
            <button
              onClick={() => {
                handleJump(15);
              }}
            >
              15
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default App;
