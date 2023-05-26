// ! ++++++++++ ÜBERPRÜFEN; OB BROWSER LOCAL STORAGE UNTERSTÜTZT ++++++++++

if (typeof Storage !== "undefined") {
  // Wenn Local Storage unterstützt wird, die vorhandenen Elemente laden
  if (localStorage.getItem("cityList")) {
    document.querySelector("#left-list").innerHTML =
      localStorage.getItem("cityList");
  } else {
    alert("Willkommen. Du hast bisher noch keine Städte gespeichert");
  }
} else {
  alert("Local Storage wird in diesem Browser nicht unterstützt");
}

// ! ++++++++++ EIGENE POSITION ++++++++++

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

// ! ++++++++++ STADT EINGEBEN & WETTERDATEN LADEN ++++++++++

let city = document.querySelector("#city");

function wetterCheck() {
  let cityName = city.value;
  console.log(cityName);
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=a0b3f65f61d0c176e7f5b42fa8744a3b`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let cityLat = data[0].lat;
      let cityLon = data[0].lon;
      console.log({ cityLat }, { cityLon });
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${cityLat}&lon=${cityLon}&appid=a0b3f65f61d0c176e7f5b42fa8744a3b`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // ! +++++ CELSIUS
          let celsius = Math.round(data.main.temp - 273.15);
          document.querySelector("#temperature").innerHTML = celsius + "°C";
          // ! +++++ HUMIDITY
          let humidity = Math.round(data.main.humidity);
          console.log({ humidity });
          // ! +++++ PRESSURE
          let airPressure = Math.round(data.main.pressure);
          console.log({ airPressure });

          // - +++++ NEUE CARD ERSTELLEN
          let newCard = document.createElement("article");
          // - +++++ ORTSNAMEN EINFÜGEN
          let newCityName = document.createElement("h2");
          newCityName.textContent = "Name : " + cityName;
          newCard.appendChild(newCityName);
          // - +++++ TEMPERATUR EINFÜGEN
          let cityTemperature = document.createElement("h2");
          cityTemperature.textContent = "Celsius : " + celsius;
          newCard.appendChild(cityTemperature);
          // - +++++ HUMIDITY EINFÜGEN
          let cityHumidity = document.createElement("h2");
          cityHumidity.textContent = "humidity : " + humidity;
          newCard.appendChild(cityHumidity);
          // - +++++ PRESSURE EINFÜGEN
          let cityPressure = document.createElement("h2");
          cityPressure.textContent = "pressure : " + airPressure;
          newCard.appendChild(cityPressure);
          // - ++++++++++ DELETE BUTTON EINFÜGEN ++++++++++
          let deleteButton = document.createElement("button");
          let deleteText = document.createTextNode("Löschen");
          deleteButton.appendChild(deleteText);
          deleteButton.classList.add("deletebutton");
          newCard.appendChild(deleteButton);
          // - +++++ CARD INS DOCUMENT EINFÜGEN
          document.querySelector("#left-list").appendChild(newCard);
          // - +++++ IN LOCAL STORAGE SPEICHERN
          localStorage.setItem(
            "cityList",
            document.querySelector("#left-list").innerHTML
          );
          // - ++++++++++ RELOAD ++++++++++
          location.reload();
        });
    });
}

// ! ++++++++++ DELETE BUTTON FUNCTION ++++++++++
let deleteButtons = document.querySelectorAll(".deletebutton");

deleteButtons.forEach(function (element) {
  element.addEventListener("click", function () {
    this.parentElement.remove();
    localStorage.setItem(
      "cityList",
      document.querySelector("#left-list").innerHTML
    );
    console.log("Card wurde gelöscht");
  });
});
