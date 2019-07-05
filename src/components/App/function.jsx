const getCityCode = () => {
  fetch(`https://api.skypicker.com/locations?term=${textInputFrom}&limit=1`)
    .then(resp => resp.json())
    .then(cityCodeFrom => cityCodeFrom.locations[0].code)
    .then(data => {
      console.log("input From");
      setFrom(data);
      fetch(`https://api.skypicker.com/locations?term=${textInputTo}&limit=1`)
        .then(resp => resp.json())
        .then(cityCodeTo => cityCodeTo.locations[0].code)
        .then(data => {
          console.log("input to");
          setTo(data);
          getFlight();
        });
    });
};
