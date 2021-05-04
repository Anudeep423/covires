import React, { Component } from "react";
import { Link } from "react-router-dom";
import Search from "./search";
import axios from "axios";

class providers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      providers: [],
    };
  }

  componentDidMount() {
    console.log("State",this.props.location.state.State)
    console.log("Res",this.props.location.state.Resource)
    const city = this.props.location.state.State;
    const resource = this.props.location.state.Resource;
    axios
      .get(
        `http://localhost:8080/api/getallprovidersByCityAndResource/${this.props.location.state.State}/${this.props.location.state.Resource}`
      )
      .then((res) => {
        if (res.data.length > 0) {
          const providers = res.data;
          console.log(providers)
          this.setState({ providers: providers });
        } else this.setState({ providers: null });
      });
  }

  render() {
    // const list = this.state.filtered.map((prov) => {
    //   return <li>{prov.Name}</li>;
    // });

    //const counList = this.state.counters;
    console.log(this.state.providers);
    if (!this.state.providers) {
      return (
        <div className="container">
          <div className="text-start" style={{ display: "inline-block" }}>
            <Link
              className="text-muted"
              to={{
                pathname: "/covires/resources",
                state: { State: this.props.location.state.State },
              }}
            >
              <i className="fa fa-chevron-left mr-2"></i>Resources
            </Link>
          </div>

          <div className="text-right">
            <Link to="/covires" className="text-muted">
              <u>I am a donor/institution</u>
            </Link>
          </div>

          <Search />

          <div className="container">No providers found :(</div>
        </div>
      );
    }

    if (this.state.providers) {
      return (
        <div className="container">
          <div className="text-start" style={{ display: "inline-block" }}>
            <Link
              className="text-muted"
              to={{
                pathname: "/covires/resources",
                state: { State: this.props.location.state.State },
              }}
            >
              <i className="fa fa-chevron-left mr-2"> </i>Resources
            </Link>
            <h1>Providers</h1>
          </div>

          <div className="text-right">
            <Link to="/covires" className="text-muted">
              <u>I am a donor/institution</u>
            </Link>
          </div>

          <Search />

          <div className="row row-cols-1 row-cols-sm-2">
            {this.state.providers.map((prov, i) => (
              <React.Fragment>
                <div className="container">
                  <div
                    key={prov._id}
                    className="card mx-auto"
                    style={{ maxWidth: "600px" }}
                  >
                    <Link
                      to={{
                        pathname: "/covires/details",
                        state: {
                          State: this.props.location.state.State,
                          Resource: this.props.location.state.Resource,
                          id: prov._id,
                        },
                      }}
                      className="links"
                    >
                      <div className="card-body mx-3 ">
                        <div className="row">
                          <div className="col-10 card-title">
                            <h6>{prov.Name}</h6>
                          </div>
                          <div className="col-2">
                            {prov.Verified && (
                              <div className="float-right">
                                <img
                                  src="verified.png"
                                  style={{
                                    height: 100,
                                    width: 120,
                                    marginTop: "-40px",
                                    marginRight: "-40px",
                                  }}
                                  alt="verified"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                        {prov.Available ? (
                          <p className="card-subtitle ">
                            <i class="fa fa-circle text-success">&ensp;</i>
                            Available
                          </p>
                        ) : (
                          <p className="card-subtitle ">
                            <i class="fa fa-circle text-danger">&ensp;</i>
                            Unavailable
                          </p>
                        )}
                        <p className="card-text text-muted">{prov.Address}</p>
                        <p className="text-muted"> {prov.lastVerified !== "Not Verified yet" ? `Last Verified on` : `` }  {prov.lastVerified}</p>
                        <div className="text-center">
                          {prov.Available ? (
                            <button
                              className="btn btn-success w-75"
                              style={{ borderRadius: 20 }}
                            >
                              CONTACT NOW
                            </button>
                          ) : (
                            <button
                              className="btn btn-danger w-75"
                              style={{ borderRadius: 20 }}
                            >
                              REQUEST
                            </button>
                          )}
                        </div>
                      </div>
                    </Link>
                    {/* <div className="row mt-2 justify-content-center vertical-align">
                      Was this helpful?
                      <button
                        onClick={() => this.handleIncrement(0)}
                        className="thumbs ml-2"
                        style={{ boxShadow: "none" }}
                      >
                        <i className="fa fa-thumbs-up fa-2x"></i>
                        <span id="counter">{counList[0]}</span>
                      </button>
                      <button
                        onClick={() => this.handleDecrement(0)}
                        className="thumbs ml-2"
                        style={{ boxShadow: "none" }}
                      >
                        <i className="fa fa-thumbs-down fa-2x"></i>
                      </button>
                    </div> */}
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      );
    } else
      return (
        <div className="container">
          <div className="text-start" style={{ display: "inline-block" }}>
            <Link className="text-muted" to="/covires/resources">
              <i className="fa fa-chevron-left mr-2"></i>Resources
            </Link>
            <h1>Providers</h1>
          </div>

          <div className="text-right">
            <Link to="/covires" className="text-muted">
              <u>I am a donor/institution</u>
            </Link>
          </div>

          <Search />

          <div className="container">No providers found :(</div>
        </div>
      );
  }
}

export default providers;
