const cities = [
  { name: "Benbrook, TX", latitude: 32.6732, longitude: -97.4606 },
  { name: "Dallas, TX", latitude: 32.6852249, longitude: -97.4568589 },
  { name: "Atlanta, GA", latitude: 33.767367, longitude: -84.4201305 },
  { name: "New York City, NY", latitude: 40.6974881, longitude: -73.979681 },
  { name: "Johnstown, PA", latitude: 40.326943, longitude: -78.9186971 },
];
const weatherProp = [
  "name",
  "temperature",
  "temperatureUnit",
  "windSpeed",
  "windDirection",
  "shortForecast",
];

const weatherSelect = document.getElementById("weather");
const weatherTblEl = document.getElementById("weatherTbl");
const pErrorEl = document.getElementById("pError");

cities.forEach((city) => {
  const cityName = new Option(city.name);
  weatherSelect.appendChild(cityName);
});

weatherSelect.addEventListener("change", () => {
  weatherTblEl.innerHTML = "";
  const selectedCity = weatherSelect.value;
  if (selectedCity === "choose") return;
  console.log(selectedCity);
  generateRows(weatherTblEl, weatherProp, selectedCity, cities);
});

function generateHeaders(table, headers) {
  const tableHead = table.createTHead();
  const row = tableHead.insertRow();
  headers.forEach((header) => {
    const cell = row.insertCell();
    cell.textContent = header;
  });
}
function generateRows(table, prop, cityName, citiesArray) {
  const tableBodyEl = table.createTBody();
  const cityObj = citiesArray.find((city) => city.name === cityName);

  const pointsUrl = `https://api.weather.gov/points/${cityObj.latitude},${cityObj.longitude}`;
  fetch(pointsUrl)
    .then((response) => response.json())
    .then((location) => {
      console.log(location);
      fetch(location.properties.forecast)
        .then((response) => response.json())
        .then((weather) => {
          weather.properties.periods.forEach((period, i) => {
            const row = tableBodyEl.insertRow();
            prop.forEach((property) => {
              const cell = row.insertCell();
              cell.textContent = period[property];
            });
          });
        });
    });
}
