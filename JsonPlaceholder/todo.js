console.log("Js working");

const genObjBtnEl = document.getElementById("genObjBtn");
const toDoIdEl = document.getElementById("toDoId");
genObjBtnEl.addEventListener("click", displayTask);

function displayTask() {
  const taskID = toDoIdEl.value;
  fetch("http://jsonplaceholder.typicode.com/todos/" + taskID)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (Object.keys(data).length === 0) {
        document.getElementById("userId").innerHTML = ``;
        document.getElementById(
          "taskid"
        ).innerHTML = `To do ID: ${taskID} is invalid`;
        document.getElementById("title").innerHTML = ``;
        document.getElementById("completed").innerHTML = ``;
        return;
      }
      document.getElementById("userId").innerHTML = `User ID: ${data.userId}`;
      document.getElementById("taskid").innerHTML = `Id: ${data.id}`;
      document.getElementById("title").innerHTML = `Title: ${data.title}`;
      document.getElementById(
        "completed"
      ).innerHTML = `Completed?: ${data.completed}`;
    });
}
