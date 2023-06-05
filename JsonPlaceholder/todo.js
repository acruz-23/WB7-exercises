console.log("Js working");

const genObjBtnEl = document.getElementById("genObjBtn");
const toDoIdEl = document.getElementById("toDoId");
genObjBtnEl.addEventListener("click", displayTask);

function displayTask() {
  const taskID = toDoIdEl.value;
  fetch("http://jsonplaceholder.typicode.com/todos/" + taskID)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("userId").innerHTML = `User ID: ${data.userId}`;
      document.getElementById("taskid").innerHTML = `Id: ${data.id}`;
      document.getElementById("title").innerHTML = `Title: ${data.title}`;
      document.getElementById(
        "completed"
      ).innerHTML = `Completed?: ${data.completed}`;
    });
}
