import React, { useEffect, useState } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";
import { useParams } from "react-router-dom";

const ModifyTask = () => {
  const [task, setTask] = useState({});
  const { taskId } = useParams();
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
  // set loading
  const [isLoading, setIsLoading] = useState(true);
  // api key
  var myHeaders = new Headers();
  myHeaders.append("AuthToken", "UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a");

  // task list
  useEffect(() => {
    setIsLoading(true);
    var taskRequestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("https://devza.com/tests/tasks/list", taskRequestOptions)
      .then((response) => response.text())
      .then((result) => {
        let tasksObject = JSON.parse(result);
        let updatedObject = tasksObject?.tasks;
        const remaining = updatedObject.filter((task) => task.id === taskId);
        setTask(remaining);
      })
      .catch((error) => console.log("error", error))
      .finally(() => setIsLoading(false));
  }, []);
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
  const handleModifyTask = (e) => {
    e.preventDefault();
    var formdata = new FormData();
    formdata.append("message", message);
    formdata.append("assigned_to", user.split(" ")[0]);
    formdata.append("assigned_name", user.split(" ")[1]);
    formdata.append("due_date", dueDate);
    formdata.append("priority", priority);
    formdata.append("taskid", taskId);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("https://devza.com/tests/tasks/update", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        let tasksObject = JSON.parse(result);
        console.log("tasksObject:", tasksObject);
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
  return (
    <div>
      {(isLoading && (
        <Spinner className="mt-5" animation="grow" variant="primary" />
      )) || (
        <div>
          <h1 className="fw-bold py-3">Update / Assign Task</h1>
          <Form className="mx-auto w-50 text-start">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Message</Form.Label>
              <Form.Control
                required
                defaultValue={task[0]?.message}
                onBlur={handleMessage}
                name="message"
                type="text"
                placeholder="Enter Message"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                Due Date{" "}
                <span className="text-secondary">
                  ({task[0]?.due_date === null ? "Pending" : task[0]?.due_date})
                </span>
              </Form.Label>

              <br />
              <DateTimePicker
                name="due_date"
                format="y-MM-dd h:mm:ss a"
                maxDetail="second"
                onChange={onChange}
                value={value}
              />
            </Form.Group>

            <Form.Label>
              Priority{" "}
              <span className="text-secondary">
                (
                {task[0]?.priority === "1"
                  ? "Normal"
                  : task[0]?.priority === "2"
                  ? "Medium"
                  : "Hard"}
                )
              </span>
            </Form.Label>
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

            <Form.Label>
              User{" "}
              <span className="text-secondary">
                (
                {task[0]?.assigned_name === false
                  ? "Pending"
                  : task[0]?.assigned_name}
                )
              </span>
            </Form.Label>
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
              onClick={handleModifyTask}
              variant="primary"
              type="submit"
            >
              Modify Task
            </Button>
            {show && (
              <Alert variant="success">
                Task Updated / Assigned Successfully!!
              </Alert>
            )}
          </Form>
        </div>
      )}
    </div>
  );
};

export default ModifyTask;
