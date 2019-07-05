import React from "react";

const Flight = ({ flights, activePage }) => (
  <>
    {[...flights].slice(activePage, activePage + 5).map((flight, index) => (
      <div className="flight" key={`flight-${index}`}>
        <div className="dTime">Departure: {flight.departureTime}</div>
        <div className="aTime">Arrival: {flight.arrivalTime}</div>
        <div className="from">From: {flight.from}</div>
        <div className="to">To: {flight.to}</div>
        <div className="price">Price: {flight.price}€</div>
      </div>
    ))}
  </>
);

export default Flight;
