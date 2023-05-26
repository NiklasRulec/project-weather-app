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

let zipCode = document.querySelector("#zipinput");
let countryCode = document.querySelector("#country");

function wetterCheck() {
  event.preventDefault();
  let countryValue = countryCode.value.toLowerCase();
  let zipValue = zipCode.value;
  console.log(countryValue);
  console.log(zipValue);
  
  fetch(
    `http://api.openweathermap.org/geo/1.0/zip?zip=${zipValue},${countryValue}&appid=a0b3f65f61d0c176e7f5b42fa8744a3b`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
  }