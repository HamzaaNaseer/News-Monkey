import "./App.css";

import React, { Component } from "react";

export default class App extends Component {
  name = "hamza";
  render() {
    return <div>hello {this.name} this is my first class based component</div>;
  }
}
