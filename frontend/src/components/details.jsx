import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const {API} = require("../Api")

class Details extends Component {
  constructor(props) {
    super(props);

    this.state = {
      provider: {},
      verified: "",
    };
  }

  componentDidMount() {
    console.log( "DEtails Componrnt",  this.props);
    axios
      .get(
        `${API}/getprovider/${this.props.location.state.id}`
      )
      .then((res) => {
        if (res.data) {
          const provider = res.data;
          this.setState({ provider: provider });
          if (provider.Verified) {
            this.setState({ verified: "verified.png" });
          }
        } else this.setState({ provider: null });
      });
  }

  setColor(e) {
    let color = "whitesmoke";
    switch (e.ResourceType) {
      case "Oxygen":
        color = "green";
        break;
      case "Plasma":
        color = "red";
        break;
      case "Beds":
        color = "blue";
        break;
      case "Remdisivir":
        color = "purple";
        break;
      case "Ambulance":
        color = "grey";
        break;
      case "Blood Bank":
        color = "Yellow";
        break;
      case "Inhouse Quarantine":
        color = "Orange";
        break;
      case "Medical":
        color = "pink";
        break;
      case "Covid Food":
        color = "lightgreen";
        break;
      default:
        color = "whitesmoke";
    }
    return color;
  }

  render() {
    const provider = this.state.provider;
    return (
      <React.Fragment>
        <div
          id="detailsMain"
          style={{
            backgroundColor: `${this.setColor(provider)}`,
          }}
        >
          <div
            className="text-start gap"
            style={{ display: "inline-block", margin: 10 }}
          >
            <Link
              style={{ color: "black" }}
              to={{
                pathname: "/covires/providers",
                state: {
                  State: this.props.location.state.State,
                  Resource: this.props.location.state.Resource,
                },
              }}
            >
              <i className="fa fa-chevron-left mr-2"></i>Providers
            </Link>
          </div>
          <div
            id="buffer"
            className="pt-5"
            style={{
              borderRadius: "40px 40px 0px 0px",
              backgroundColor: "white",
            }}
          >
            <h1 id="name">{provider.Name}</h1>
            <div className="float-right">
              <img src={this.state.verified} />
            </div>
            <div className="mb-4 mt-2" id="deetsPrice">
              <h2 id="name" style={{ fontWeight: 0, fontStyle: "italic" }}>
                {provider.Price} <p>₹ / tank</p>
              </h2>
              <h3
                id="name"
                className="mt-4"
                style={{ fontWeight: "bold", fontStyle: "italic" }}
              >
                {provider.Address}
              </h3>
              <p>{provider.Description}</p>
            </div>
            <div className="text-center py-3">
              <button
                style={{
                  height: "60px",
                  maxWidth: 200,
                  fontSize: "20px",
                }}
                className="btn btn-success"
              >
                <i className="fa fa-phone">&ensp;</i> Contact Now
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Details;
