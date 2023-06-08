console.log("js working");
const headers = ["Department", "Course Number", "Title", "More Info"];

const courseTblEl = document.getElementById("courseTbl");
generateHeaders(courseTbl, headers);
let courseUrl = "http://localhost:8081/api/courses";

onload = async () => {
  const tableBodyEl = courseTblEl.createTBody();
  const urlResult = await fetch(courseUrl);
  const courses = await urlResult.json();
  courses.forEach((course) => {
    const row = tableBodyEl.insertRow();
    const departmentCell = row.insertCell();
    const courseNumCell = row.insertCell();
    const titleCell = row.insertCell();
    const linkCell = row.insertCell();

    linkCell.outerHTML = `<td><a href='./details.html?courseid=${course.id}'>See Details</a></td> `;
    departmentCell.textContent = course.dept;
    courseNumCell.textContent = course.courseNum;
    titleCell.textContent = course.courseName;
  });
};

function generateHeaders(table, headers) {
  const tableHead = table.createTHead();
  const row = tableHead.insertRow();
  headers.forEach((header) => {
    const cell = row.insertCell();
    cell.outerHTML = `<th>${header}</th>`;
  });
}
