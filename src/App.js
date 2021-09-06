import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Landing from './components/Landing.js'
import Login from './components/Login.js'
import UserProvider from "./providers/UserProvider";

function App() {
  return (
    <UserProvider>
    <Router>
    <div className="App">
      <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/landing">
            <Landing />
          </Route>
        </Switch>
    </div>
    </Router>
    </UserProvider>
  );
}

export default App;
