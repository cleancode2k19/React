import React from 'react';
import './App.css';
import Prime from './Prime';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import TempTracker from "./TempTracker";

function App() {
  return (
    <Router>
    <div className="App">
    <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/calc">Get Temperature</Link>
            </li>
          </ul>
      <Route exact path="/calc" component={TempTracker} />
      <Route exact path="/" component={Prime} />
    </div>
    </Router>
  );
}

export default App;
