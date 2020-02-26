import React from "react";
import ReactDom from "react-dom";
import Weather from "./components/Weather.jsx";

const App = props => {
  return (
    <div>
      <h2>My App</h2>
      <Weather />
    </div>
  );
};

export default App;
