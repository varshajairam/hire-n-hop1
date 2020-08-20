import React, { Component } from "react";
import "./App.css";
import Main from "./components/Main";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./components/Navbar/Navbar";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          {/* App Component Has a Child Component called Main*/}
          <Main />
        </div>
      </BrowserRouter>
    );
  }
}

//Export the App component so that it can be used in index.js
export default App;
