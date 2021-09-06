import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Landing from './components/Landing.js'
import Login from './components/Login.js'
import UserProvider from "./providers/UserProvider";
import SocketProvider from './providers/SocketProvider';
import P5Provider from './providers/P5Provider';

function App() {
  return (
    <SocketProvider>
      <UserProvider>
        <P5Provider>
          <Router>
          <div className="App">
            <Switch>
                <Route exact path="/">
                  <Login/>
                </Route>
                <Route exact path="/landing">
                  <Landing/>
                </Route>
              </Switch>
          </div>
          </Router>
        </P5Provider> 
      </UserProvider>
    </SocketProvider>
  );
}

export default App;
