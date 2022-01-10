import React, { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import ViewTask from "../ViewTask/ViewTask";
import DateTimePicker from "react-datetime-picker";
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";

const ViewTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);

  // display tasks based on search
  const [displayTasks, setDisplayTasks] = useState([]);
  // DragEnd handler
  function handleOnDragEnd(result) {
    if (!result.destination) return;
    if (displayTasks.length === 0) {
      const items = Array.from(tasks);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setTasks(items);
    } else {
      const items = Array.from(displayTasks);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setDisplayTasks(items);
    }
  }
  // react datetime picker
  const [value, onChange] = useState(new Date());

  // Picked Date
  let pickDate;
  if (value?.toLocaleDateString("fr-CA") === undefined) {
    pickDate = "null";
  } else {
    pickDate = value?.toLocaleDateString("fr-CA");
  }

  // api key
  var myHeaders = new Headers();
  myHeaders.append("AuthToken", "UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a");

  useEffect(() => {
    setIsLoading(true);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("https://devza.com/tests/tasks/list", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        let tasksObject = JSON.parse(result);
        let updatedObject = tasksObject?.tasks;
        setTasks(updatedObject);
      })
      .catch((error) => console.log("error", error))
      .finally(() => setIsLoading(false));
  }, []);
  const handleDateShow = () => {
    setShow(true);
  };
  // handle search results
  const handleSearch = (e) => {
    e.preventDefault();
    const getSearch = e.target.value;
    const getTasks = tasks.filter((task) =>
      task.message.toLowerCase().includes(getSearch.toLowerCase())
    );
    setDisplayTasks(getTasks);
  };

  return (
    <div>
      {(isLoading && (
        <Spinner className="mt-5" animation="grow" variant="primary" />
      )) || (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <div>
            <h1 className="fw-bold pt-3">View All Tasks</h1>
            <div className="py-2">
              <Form.Control
                type="text"
                onChange={handleSearch}
                id="search"
                placeholder="Search tasks"
                className="mx-auto w-50"
              />
            </div>
            {!show && (
              <div className="py-2">
                <Button onClick={handleDateShow}>
                  View Task Based on Date
                </Button>
              </div>
            )}
            {show && (
              <div className="py-3">
                <DateTimePicker
                  name="due_date"
                  format="y-MM-dd h:mm:ss a"
                  maxDetail="hour"
                  onChange={onChange}
                  value={value}
                />
              </div>
            )}

            <div className="d-md-flex justify-content-center">
              {/* Normal Priority Task */}

              <Droppable droppableId="droppableNormal">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="col-md-4"
                  >
                    <h4 className="fw-bold">Normal</h4>
                    <div>
                      {displayTasks.length === 0
                        ? pickDate === "null" || show === false
                          ? tasks
                              .filter((task) => task.priority === "1")
                              .map((task, index) => (
                                <Draggable
                                  key={task.id}
                                  draggableId={task.id}
                                  index={index}
                                >
                                  {(provided) => (
                                    <div
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      ref={provided.innerRef}
                                    >
                                      <ViewTask
                                        tasks={tasks}
                                        key={task.id}
                                        setTasks={setTasks}
                                        task={task}
                                      ></ViewTask>
                                    </div>
                                  )}
                                </Draggable>
                              ))
                          : tasks
                              .filter(
                                (task) =>
                                  task.priority === "1" &&
                                  task.due_date?.split(" ")[0] === pickDate
                              )
                              .map((task, index) => (
                                <Draggable
                                  key={task.id}
                                  draggableId={task.id}
                                  index={index}
                                >
                                  {(provided) => (
                                    <div
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      ref={provided.innerRef}
                                    >
                                      <ViewTask
                                        tasks={tasks}
                                        key={task.id}
                                        setTasks={setTasks}
                                        task={task}
                                      ></ViewTask>
                                    </div>
                                  )}
                                </Draggable>
                              ))
                        : pickDate === "null" || show === false
                        ? displayTasks
                            .filter((task) => task.priority === "1")
                            .map((task, index) => (
                              <Draggable
                                key={task.id}
                                draggableId={task.id}
                                index={index}
                              >
                                {(provided) => (
                                  <div
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                  >
                                    <ViewTask
                                      tasks={tasks}
                                      key={task.id}
                                      setTasks={setTasks}
                                      task={task}
                                    ></ViewTask>
                                  </div>
                                )}
                              </Draggable>
                            ))
                        : displayTasks
                            .filter(
                              (task) =>
                                task.priority === "1" &&
                                task.due_date?.split(" ")[0] === pickDate
                            )
                            .map((task, index) => (
                              <Draggable
                                key={task.id}
                                draggableId={task.id}
                                index={index}
                              >
                                {(provided) => (
                                  <div
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                  >
                                    <ViewTask
                                      tasks={tasks}
                                      key={task.id}
                                      setTasks={setTasks}
                                      task={task}
                                    ></ViewTask>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

              {/* Medium Priority Task */}

              <Droppable droppableId="droppableMedium">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="col-md-4"
                  >
                    <h4 className="fw-bold">Medium</h4>
                    <div>
                      {displayTasks.length === 0
                        ? pickDate === "null" || show === false
                          ? tasks
                              .filter((task) => task.priority === "2")
                              .map((task, index) => (
                                <Draggable
                                  key={task.id}
                                  draggableId={task.id}
                                  index={index}
                                >
                                  {(provided) => (
                                    <div
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      ref={provided.innerRef}
                                    >
                                      <ViewTask
                                        tasks={tasks}
                                        key={task.id}
                                        setTasks={setTasks}
                                        task={task}
                                      ></ViewTask>
                                    </div>
                                  )}
                                </Draggable>
                              ))
                          : tasks
                              .filter(
                                (task) =>
                                  task.priority === "2" &&
                                  task.due_date?.split(" ")[0] === pickDate
                              )
                              .map((task, index) => (
                                <Draggable
                                  key={task.id}
                                  draggableId={task.id}
                                  index={index}
                                >
                                  {(provided) => (
                                    <div
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      ref={provided.innerRef}
                                    >
                                      <ViewTask
                                        tasks={tasks}
                                        key={task.id}
                                        setTasks={setTasks}
                                        task={task}
                                      ></ViewTask>
                                    </div>
                                  )}
                                </Draggable>
                              ))
                        : pickDate === "null" || show === false
                        ? displayTasks
                            .filter((task) => task.priority === "2")
                            .map((task, index) => (
                              <Draggable
                                key={task.id}
                                draggableId={task.id}
                                index={index}
                              >
                                {(provided) => (
                                  <div
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                  >
                                    <ViewTask
                                      tasks={tasks}
                                      key={task.id}
                                      setTasks={setTasks}
                                      task={task}
                                    ></ViewTask>
                                  </div>
                                )}
                              </Draggable>
                            ))
                        : displayTasks
                            .filter(
                              (task) =>
                                task.priority === "2" &&
                                task.due_date?.split(" ")[0] === pickDate
                            )
                            .map((task, index) => (
                              <Draggable
                                key={task.id}
                                draggableId={task.id}
                                index={index}
                              >
                                {(provided) => (
                                  <div
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                  >
                                    <ViewTask
                                      tasks={tasks}
                                      key={task.id}
                                      setTasks={setTasks}
                                      task={task}
                                    ></ViewTask>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

              {/* High Priority Task */}

              <Droppable droppableId="droppableHigh">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="col-md-4"
                  >
                    <h4 className="fw-bold">High</h4>
                    <div>
                      {displayTasks.length === 0
                        ? pickDate === "null" || show === false
                          ? tasks
                              .filter((task) => task.priority === "3")
                              .map((task, index) => (
                                <Draggable
                                  key={task.id}
                                  draggableId={task.id}
                                  index={index}
                                >
                                  {(provided) => (
                                    <div
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      ref={provided.innerRef}
                                    >
                                      <ViewTask
                                        tasks={tasks}
                                        key={task.id}
                                        setTasks={setTasks}
                                        task={task}
                                      ></ViewTask>
                                    </div>
                                  )}
                                </Draggable>
                              ))
                          : tasks
                              .filter(
                                (task) =>
                                  task.priority === "3" &&
                                  task.due_date?.split(" ")[0] === pickDate
                              )
                              .map((task, index) => (
                                <Draggable
                                  key={task.id}
                                  draggableId={task.id}
                                  index={index}
                                >
                                  {(provided) => (
                                    <div
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      ref={provided.innerRef}
                                    >
                                      <ViewTask
                                        tasks={tasks}
                                        key={task.id}
                                        setTasks={setTasks}
                                        task={task}
                                      ></ViewTask>
                                    </div>
                                  )}
                                </Draggable>
                              ))
                        : pickDate === "null" || show === false
                        ? displayTasks
                            .filter((task) => task.priority === "3")
                            .map((task, index) => (
                              <Draggable
                                key={task.id}
                                draggableId={task.id}
                                index={index}
                              >
                                {(provided) => (
                                  <div
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                  >
                                    <ViewTask
                                      tasks={tasks}
                                      key={task.id}
                                      setTasks={setTasks}
                                      task={task}
                                    ></ViewTask>
                                  </div>
                                )}
                              </Draggable>
                            ))
                        : displayTasks
                            .filter(
                              (task) =>
                                task.priority === "3" &&
                                task.due_date?.split(" ")[0] === pickDate
                            )
                            .map((task, index) => (
                              <Draggable
                                key={task.id}
                                draggableId={task.id}
                                index={index}
                              >
                                {(provided) => (
                                  <div
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                  >
                                    <ViewTask
                                      tasks={tasks}
                                      key={task.id}
                                      setTasks={setTasks}
                                      task={task}
                                    ></ViewTask>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        </DragDropContext>
      )}
    </div>
  );
};

export default ViewTasks;
