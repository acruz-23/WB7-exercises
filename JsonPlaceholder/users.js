console.log("JS working");

const genUsersBtn = document.getElementById("genUsers");
const tabBodyEl = document.getElementById("tabBody");

genUsersBtn.addEventListener("click", displayUsers);

function displayUsers() {
  console.log("click");
  fetch("http://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((user) => {
        const row = tabBodyEl.insertRow();

        const idCell = row.insertCell();
        const nameCell = row.insertCell();
        const userNameCell = row.insertCell();
        const emailCell = row.insertCell();
        const websiteCell = row.insertCell();
        const companyCell = row.insertCell();

        idCell.textContent = user.id;
        nameCell.textContent = user.name;
        userNameCell.textContent = user.username;
        emailCell.textContent = user.email;
        websiteCell.textContent = user.website;
        companyCell.textContent = user.company.name;
      });
    });
}
