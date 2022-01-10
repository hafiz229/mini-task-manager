import React, { useEffect, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";

const AddTask = () => {
  // react datetime picker
  const [value, onChange] = useState(new Date());
  // message state
  const [message, setMessage] = useState("");
  // priority state
  const [priority, setPriority] = useState("1");
  // user state
  const [user, setUser] = useState("false false");
  // list user state
  const [persons, setPersons] = useState();
  // success message
  const [show, setShow] = useState(false);

  // api key
  var myHeaders = new Headers();
  myHeaders.append("AuthToken", "UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a");
  // due date calculation
  let dueDate;
  if (value?.toLocaleDateString("fr-CA") === undefined) {
    dueDate = "null";
  } else {
    dueDate =
      value?.toLocaleDateString("fr-CA") +
      " " +
      value?.toLocaleTimeString("en-GB");
  }
  // current date calculation
  var currentdate = new Date();
  var datetime =
    currentdate.getFullYear() +
    "-" +
    (currentdate.getDate() < 10 ? "0" : "") +
    currentdate.getDate() +
    (currentdate.getMonth() + 1 < 10 ? "-0" : "-") +
    (currentdate.getMonth() + 1) +
    " " +
    (currentdate.getHours() < 10 ? "0" : "") +
    currentdate.getHours() +
    (currentdate.getMinutes() < 10 ? ":0" : ":") +
    currentdate.getMinutes() +
    (currentdate.getSeconds() < 10 ? ":0" : ":") +
    currentdate.getSeconds();

  // get list of all users
  var listRequestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  useEffect(() => {
    fetch("https://devza.com/tests/tasks/listusers", listRequestOptions)
      .then((response) => response.text())
      .then((result) => {
        let personsObject = JSON.parse(result);
        let updatedObject = personsObject?.users;
        setPersons(updatedObject);
      })
      .catch((error) => console.log("error", error));
  }, []);

  // create task
  const handleCreateTask = (e) => {
    e.preventDefault();
    setShow(false);
    var formdata = new FormData();
    formdata.append("message", message);
    formdata.append("assigned_to", user.split(" ")[0]);
    formdata.append("assigned_name", user.split(" ")[1]);
    formdata.append("created_on", datetime);
    formdata.append("due_date", dueDate);
    formdata.append("priority", priority);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("https://devza.com/tests/tasks/create", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        let tasksObject = JSON.parse(result);
        let updatedObject = tasksObject?.status;
        if (updatedObject === "success") {
          setShow(true);
        }
      })
      .catch((error) => console.log("error", error));
  };

  // message input
  const handleMessage = (e) => {
    setMessage(e.target.value);
  };
  // priority input
  const handlePriority = (e) => {
    setPriority(e.target.value);
  };
  // user input
  const handleUser = (e) => {
    setUser(e.target.value);
  };

  // console.log("Due Date:", dueDate);
  // console.log("Message:", message);
  // console.log("Priority:", priority);
  // console.log("assigned_to:", user.split(" ")[0]);
  // console.log("assigned_name:", user.split(" ")[1]);
  // console.log("Current DateTime:", datetime);

  return (
    <div>
      <h1 className="fw-bold py-3">Create Task</h1>
      <Form className="mx-auto w-50 text-start">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Message</Form.Label>
          <Form.Control
            required
            onBlur={handleMessage}
            name="message"
            type="text"
            placeholder="Enter Message"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Due Date</Form.Label>
          {/* <Form.Control name="due_date" placeholder="Enter Date"></Form.Control> */}
          <br />
          <DateTimePicker
            name="due_date"
            format="y-MM-dd h:mm:ss a"
            maxDetail="second"
            onChange={onChange}
            value={value}
          />
        </Form.Group>

        <Form.Label>Priority</Form.Label>
        <Form.Select
          name="priority"
          onChange={handlePriority}
          className="mb-3"
          aria-label="Default select example"
        >
          <option value="1">Normal</option>
          <option value="2">Mid</option>
          <option value="3">High</option>
        </Form.Select>

        <Form.Label>User</Form.Label>
        <Form.Select
          onChange={handleUser}
          className="mb-3"
          aria-label="Default select example"
        >
          <option value="false false">None</option>
          {Array.isArray(persons) &&
            persons.length &&
            persons.map((user) => (
              <option value={user.id + " " + user.name} key={user.id}>
                {user.name}
              </option>
            ))}
        </Form.Select>

        <Button
          className="mb-3"
          onClick={handleCreateTask}
          variant="primary"
          type="submit"
        >
          Create Task
        </Button>
        {show && <Alert variant="success">Task Added Successfully!!</Alert>}
      </Form>
    </div>
  );
};

export default AddTask;
