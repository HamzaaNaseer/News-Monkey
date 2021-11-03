import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import React, { Component } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <NavBar />

          <Switch>
            <Route exact path="/">
              <News key="home" pageSize={6} category={"general"} />
            </Route>
            <Route exact path="/general">
              <News key="general" pageSize={6} category={"general"} />
            </Route>
            <Route exact path="/sports">
              <News key="sports" pageSize={6} category={"sports"} />
            </Route>
            <Route exact path="/technology">
              <News key="technology" pageSize={6} category={"technology"} />
            </Route>
            <Route exact path="/health">
              <News key="health" pageSize={6} category={"health"} />
            </Route>
            <Route exact path="/science">
              <News key="science" pageSize={6} category={"science"} />
            </Route>
            <Route exact path="/entertainment">
              <News
                key="entertainment"
                pageSize={6}
                category={"entertainment"}
              />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
