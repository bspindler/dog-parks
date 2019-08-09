import React from "react";
import "./App.css";
import Form from "./components/Form";

// let responseData;
// let lat;
// let lng;

function App() {
  return (
    <div id="dog-park">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <Form />
          </div>
          <div className="col-md-6">
            <h1>Results</h1>
            <div id="parkResults"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
