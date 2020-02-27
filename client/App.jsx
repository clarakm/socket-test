import React from "react";
import ReactDom from "react-dom";
import Weather from "./components/Weather.jsx";
import Test from "./components/Test.jsx";
import "./stylesheets/styles.css";

const App = props => {
  return (
    <div>
      <h2>Live Chat</h2>
      {/* <Weather /> */}
      <div className="test">
        <Test />
      </div>
    </div>
  );
};

export default App;
