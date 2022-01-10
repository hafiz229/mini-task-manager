import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./ViewTask.css";

const ViewTask = ({ task, tasks, setTasks }) => {
  const { id, message, assigned_name, created_on, due_date, priority } = task;
  // api key
  var myHeaders = new Headers();
  myHeaders.append("AuthToken", "UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a");
  let taskBackground;
  if (priority === "1") {
    // normal
    taskBackground = {
      backgroundColor: "#4DFE42",
    };
  } else if (priority === "2") {
    // medium
    taskBackground = {
      backgroundColor: "#FFBD30",
    };
  } else {
    // high
    taskBackground = {
      backgroundColor: "#EE6028",
    };
  }

  //   console.log("dueDate:", due_date?.split(" ")[0]);

  // delete a task
  const handleDelete = (deleteId) => {
    // ask for a confirmation before delete a task
    const sure = window.confirm("Are you sure, you want to continue?");
    if (sure === true) {
      var formdata = new FormData();
      formdata.append("taskid", deleteId);
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      fetch("https://devza.com/tests/tasks/delete", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          let tasksObject = JSON.parse(result);
          let updatedObject = tasksObject?.status;
          if (updatedObject === "success") {
            alert(tasksObject?.message);
            const remaining = tasks.filter((task) => task.id !== deleteId);
            setTasks(remaining);
          }
        })
        .catch((error) => console.log("error", error));
    }
  };

  return (
    <div className="mx-auto w-75 mb-3 hover-style" style={taskBackground}>
      <div className="text-start p-3">
        <p style={{ height: "50px" }}>Message: {message}</p>
        <p style={{ height: "50px" }}>Assigned To: {assigned_name}</p>
        <p style={{ height: "50px" }}>Created On: {created_on}</p>
        <p style={{ height: "50px" }}>Due Date: {due_date}</p>
        <p>
          Priority:{" "}
          {priority === "1" ? "Normal" : priority === "2" ? "Medium" : "High"}
        </p>
        <Link to={`/modifytask/${id}`} style={{ textDecoration: "none" }}>
          <Button
            className="btn btn-grad-common me-2 mb-2 text-start"
            style={{
              backgroundColor: "rgb(93, 63, 211)",
              color: "white",
              display: "inline",
            }}
          >
            Update / Assign
          </Button>
        </Link>
        <Button
          className="btn btn-grad-common mb-2"
          style={{
            backgroundColor: "rgb(93, 63, 211)",
            color: "white",
            display: "inline",
          }}
          onClick={() => handleDelete(id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ViewTask;
