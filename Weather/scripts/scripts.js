const cities = [
  { name: "Benbrook, TX", latitude: 32.6732, longitude: -97.4606 },
  { name: "Dallas, TX", latitude: 32.6852249, longitude: -97.4568589 },
  { name: "Atlanta, GA", latitude: 33.767367, longitude: -84.4201305 },
  { name: "New York City, NY", latitude: 40.6974881, longitude: -73.979681 },
  { name: "Johnstown, PA", latitude: 40.326943, longitude: -78.9186971 },
];
const headers = ["Day", "Temperature", "Wind", "Forecast"];

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
  generateHeaders(weatherTblEl, headers);
  generateRows(weatherTblEl, selectedCity, cities);
});

function generateHeaders(table, headers) {
  const tableHead = table.createTHead();
  const row = tableHead.insertRow();
  headers.forEach((header) => {
    const cell = row.insertCell();
    cell.outerHTML = `<th>${header}</th>`;
  });
}
async function generateRows(table, cityName, citiesArray) {
  const tableBodyEl = table.createTBody();
  const cityObj = citiesArray.find((city) => city.name === cityName);
  const pointsUrl = `https://api.weather.gov/points/${cityObj.latitude},${cityObj.longitude}`;

  const govP = await fetch(pointsUrl);
  const location = await govP.json();
  const weatherP = await fetch(location.properties.forecast);
  const locationWeather = await weatherP.json();
  console.log(locationWeather.properties.periods);
  locationWeather.properties.periods.forEach((period) => {
    const periodDate = new Date(period.startTime);
    const periodMonth = +periodDate.getMonth() + 1;
    const periodDay = periodDate.getDate();
    const row = tableBodyEl.insertRow();
    const timeCell = row.insertCell();
    const tempCell = row.insertCell();
    const windCell = row.insertCell();
    const forecastCell = row.insertCell();

    timeCell.textContent = `${period.name} (${periodMonth}/${periodDay})`;
    tempCell.textContent =
      "Temperature " + period.temperature + " " + period.temperatureUnit;
    windCell.textContent =
      "Winds " + period.windDirection + " " + period.windSpeed;
    forecastCell.textContent = period.shortForecast;
  });

  // fetch(pointsUrl)
  //   .then((response) => response.json())
  //   .then((location) => {
  //     console.log(location);
  //     fetch(location.properties.forecast)
  //       .then((response) => response.json())
  //       .then((weather) => {
  //         weather.properties.periods.forEach((period) => {
  //           const row = tableBodyEl.insertRow();
  //           const timeCell = row.insertCell();
  //           const tempCell = row.insertCell();
  //           const windCell = row.insertCell();
  //           const forecastCell = row.insertCell();

  //           timeCell.textContent = period.name;
  //           tempCell.textContent =
  //             "Temperature " +
  //             period.temperature +
  //             " " +
  //             period.temperatureUnit;
  //           windCell.textContent =
  //             "Winds " + period.windDirection + " " + period.windSpeed;
  //           forecastCell.textContent = period.shortForecast;
  //         });
  //       });
  //   });
}
