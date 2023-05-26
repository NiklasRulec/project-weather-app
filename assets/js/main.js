navigator.geolocation.getCurrentPosition(function (position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log({ lat }, { lon });

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a0b3f65f61d0c176e7f5b42fa8744a3b`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
});

let zip = 76473;
let cc = "de";

fetch(
  `http://api.openweathermap.org/geo/1.0/zip?zip=${zip},${cc}&appid=a0b3f65f61d0c176e7f5b42fa8744a3b`
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });
