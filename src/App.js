import React from "react";
import classNames from "classnames";
import "./App.css";
import Form from "./components/Form";

class App extends React.Component {
  state = { submitted: "" };

  reset() {
    window.location.reload();
  }

  callBackFunction = formSubmitted => {
    this.setState({ submitted: formSubmitted });
  };

  render() {
    return (
      <div id="dog-park">
        <div className="container">
          <div className="row">
            <div
              className={classNames({
                "col-md-12": !this.state.submitted,
                "d-none": this.state.submitted
              })}
            >
              <Form appCallback={this.callBackFunction} />
            </div>
            <div
              className={classNames({
                "d-none": !this.state.submitted,
                "col-md-12": this.state.submitted
              })}
            >
              <div className="row" id="resultsHeader">
                <div className="col-6">
                  <h1>Results</h1>{" "}
                </div>
                <div className="col-6">
                  <button className="btn float-right" onClick={this.reset}>
                    Reset
                  </button>
                </div>
              </div>
              <div id="parkResults" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
