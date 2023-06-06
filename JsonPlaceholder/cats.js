console.log("js works");
console.log("JS working");

const genUsersBtn = document.getElementById("genFacts");
const tabBodyEl = document.getElementById("tabBody");

genUsersBtn.addEventListener("click", displayUsers);

function displayUsers() {
  tabBodyEl.innerHTML = null;
  fetch("https://cat-fact.herokuapp.com/facts/")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((fact, i) => {
        const row = tabBodyEl.insertRow();

        const numCell = row.insertCell();
        const factCell = row.insertCell();

        numCell.textContent = i + 1;
        factCell.textContent = fact.text;
      });
    });
}
