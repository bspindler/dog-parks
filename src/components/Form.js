import React from "react";
import ReactDOM from "react-dom";

let lat;
let lng;
let limit;
let responseData;
let radius;
let dogParks = [];

const FOUR_SQUARE_CLIENT_ID =
  "client_id=T01WIRMBUSCYUWWMQ0TV03PY4I2WJ0QL4OCM2EP2CM0NOV40";
const FOUR_SQUARE_CLIENT_SECRET =
  "client_secret=1MK3A1HIJVPEX3DVBD2ICEOAUGXIQWUYUCIDVWU2OHPWBITO";
const FOUR_SQUARE_VERSION = "v=20180323";
const FOUR_SQUARE_QUERY = "query=dog+park";
const GOOGLE_API_KEY = "AIzaSyC1_ggHfqAiYngq0Jvro7eUHyXBCCN3mSY";

class Form extends React.Component {
  sendData = () => {
    this.props.appCallback(true);
  };
  constructor() {
    super();
    this.state = {
      zip: "",
      radius: "20",
      limit: "10"
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  changeZip(event) {
    this.setState({ zip: event.target.value });
  }
  changeRadius(event) {
    this.setState({ radius: event.target.value });
  }
  changeLimit(event) {
    this.setState({ limit: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.zip.length === 5) {
      if (this.state.limit) {
        limit = this.state.limit;
        if (this.state.radius >= 1 && this.state.radius <= 100) {
          this.sendData();
          radius = this.state.radius;
          // Starter code for Dog park locator
          fetch(
            "https://maps.googleapis.com/maps/api/geocode/json" +
              ("?key=" + GOOGLE_API_KEY) +
              ("&address=" + this.state.zip)
          ).then(function(response) {
            response.json().then(function(data) {
              lat = data.results[0].geometry.location.lat;
              lng = data.results[0].geometry.location.lng;
              fetch(
                "https://api.foursquare.com/v2/venues/search" + // Foursquare Places API - *Search* endpoint
                  ("?" + FOUR_SQUARE_CLIENT_ID) +
                  ("&" + FOUR_SQUARE_CLIENT_SECRET) +
                  ("&" + FOUR_SQUARE_VERSION) +
                  ("&limit=" + limit) +
                  ("&" + FOUR_SQUARE_QUERY) +
                  ("&radius=" + radius * 1609.344) +
                  ("&ll=" + lat + "," + lng)
              )
                .then(function(response) {
                  // Code for handling API response
                  response.json().then(function(data) {
                    responseData = data.response.venues;
                    responseData.forEach(function(element) {
                      let park = {
                        name: element.name,
                        address: element.location.formattedAddress,
                        distance: (
                          element.location.distance / 1609.344
                        ).toFixed(2),
                        latitude: element.location.lat,
                        longitude: element.location.lng,
                        link:
                          "//www.google.com/maps/@" +
                          element.location.lat +
                          "," +
                          element.location.lng +
                          ",15z",
                        title: "Link to " + element.name + " on Google Maps"
                      };
                      dogParks.push(park);
                    });
                    dogParks = dogParks.sort((a, b) =>
                      parseFloat(a.distance) > parseFloat(b.distance) ? 1 : -1
                    );
                    console.log(dogParks);
                    const dogParkLocations = dogParks.map(dogParks => (
                      <li key={dogParks.name}>
                        {/* <a
                          href={dogParks.link}
                          title={dogParks.title}
                          target="_blank"
                          rel="noopener noreferrer"
                        > */}
                        <p>
                          <strong>{dogParks.name}</strong>, {dogParks.distance}{" "}
                          miles away
                        </p>
                        <p>
                          {dogParks.address[0]}, {dogParks.address[1]},{" "}
                          {dogParks.address[2]}
                        </p>
                        {/* </a> */}
                      </li>
                    ));

                    ReactDOM.render(
                      <ul>{dogParkLocations}</ul>,
                      document.getElementById("parkResults")
                    );
                  });
                })
                .catch(function() {
                  // Code for handling errors
                });
            });
          });
        } else {
          alert("Enter a valid radius");
        }
      } else {
        alert("Enter a valid maximum number of result [1,50]");
      }
    } else {
      alert("Enter a 5 digit zip code");
    }
  }

  render() {
    return (
      <div>
        <h1>Dog Park Locator</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="zipCode">Zip Code</label>
            <input
              className="form-control"
              id="zipCodeImput"
              aria-describedby="zipCode"
              value={this.state.zip}
              onChange={event => this.changeZip(event)}
              placeholder="Enter a 5 digit zip code"
            />
          </div>
          <div className="form-group">
            <label htmlFor="radius">Radius (mi.)</label>
            <input
              className="form-control"
              id="radiusInput"
              aria-describedby="radius"
              value={this.state.radius}
              onChange={event => this.changeRadius(event)}
              placeholder="Radius (mi.)"
            />
          </div>
          <div className="form-group">
            <label htmlFor="limit">Maximum Number of Results</label>
            <input
              className="form-control"
              id="limitInput"
              aria-describedby="limit"
              value={this.state.limit}
              onChange={event => this.changeLimit(event)}
              placeholder="Default is 10"
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Form;
