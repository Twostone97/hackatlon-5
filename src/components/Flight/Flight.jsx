import React from "react";

const Flight = ({ flights }) => {
  const result = flights.map(flight => {
    return (
      <>
        <div className="dTime">Departure: {flight.departureTime}</div>
        <div className="aTime">Arrival: {flight.arrivalTime}</div>
        <div className="from">From: {flight.from}</div>
        <div className="to">To: {flight.to}</div>
        <div className="price">Price: {flight.price}€</div>
      </>
    );
  });

  return (
    <>
      <div className="flight">{result}</div>
    </>
  );
};

export default Flight;
