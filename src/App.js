import React from "react";
import classNames from "classnames";
import "./App.css";
import Form from "./components/Form";

class App extends React.Component {
  state = { submitted: "" }

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
                "col-md-6": this.state.submitted
              })}
            >
              <Form appCallback={this.callBackFunction} />
            </div>
            <div
              className={classNames({
                "d-none": !this.state.submitted,
                "col-md-6": this.state.submitted
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
}

export default App;
