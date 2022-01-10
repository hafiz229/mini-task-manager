import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from "./components/Shared/Navigation";
import AddTask from "./components/AddTask/AddTask";
import ViewTasks from "./components/ViewTasks/ViewTasks";
import ModifyTask from "./components/ModifyTask/ModifyTask";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route exact path="/">
            <ViewTasks />
          </Route>
          <Route path="/viewtask">
            <ViewTasks />
          </Route>
          <Route path="/addtask">
            <AddTask />
          </Route>
          <Route path="/modifytask/:taskId">
            <ModifyTask />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
