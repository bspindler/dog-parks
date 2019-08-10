import React from "react";
import classNames from "classnames";
import "./App.css";
import Form from "./components/Form";

function App() {
  return (
    <div id="dog-park">
      <div className="container">
        <div className="row">
          <div
            className={classNames({
              "col-md-12": !true,
              "col-md-6": true
            })}
          >
            <Form />
          </div>
          <div
            className={classNames({
              "d-none": !true,
              "col-md-6": true
            })}
          >
            <h1>Results</h1>
            <div id="parkResults" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
