console.log("js working");
const courseDetailsTbl = document.getElementById("courseDetails");
const headers = {
  id: "ID",
  dept: "Department",
  courseNum: "Course Number",
  courseName: "Course Name",
  instructor: "Instructor",
  startDate: "Start Date",
  numDays: "Number of Days",
};
onload = () => {
  const urlParams = new URLSearchParams(location.search);
  let id = -1;
  if (urlParams.has("courseid") === true) {
    const tableBodyEl = courseDetailsTbl.createTBody();
    id = urlParams.get("courseid");
    console.log("id", id);
    fetch(`http://localhost:8081/api/courses/${id}`)
      .then((response) => response.json())
      .then((course) => {
        for (let prop in headers) {
          const row = tableBodyEl.insertRow();
          const headerCell = row.insertCell();
          const dataCell = row.insertCell();

          headerCell.outerHTML = `<th>${headers[prop]}:</th>`;
          dataCell.textContent = course[prop];
        }
      });
  }
};
