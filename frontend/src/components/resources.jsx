import React, { Component, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Search from "./search";

const Resources = (props) => {
  console.log("RES", props);
  const State = props.history.location.state.State;

  const [resources, setResources] = useState();
  const [redirect, setRedirect] = useState(false);
  const [resource, setResource] = useState();
  useEffect(() => {
    fetch(`http://localhost:8080/api/getallresourcesinstate/${State}`)
      .then((res) => res.json())
      .then((res) => {
        setResources(res);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log();

  return (
    <>
      {console.log(resources)}
      {resources ? (
        <div>
          <div className="container">
            <div className="text-start" style={{ display: "inline-block" }}>
              <Link className="text-muted" to="/covires">
                <i className="fa fa-chevron-left mr-2"></i> {State}
              </Link>
              <h1>Resources</h1>
            </div>

            <div className="text-right">
              <Link to="/covires" className="text-muted">
                <u>I am a donor/institution</u>
              </Link>
            </div>

            <Search />
            {redirect ? (
              <Redirect
                to={{
                  pathname: "/covires/providers",
                  state: { State, Resource: resource },
                }}
              />
            ) : (
              ""
            )}
            <div className="container">
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
                {resources.map((data, index) => {
                  return (
                    <div className="col-6">
                      <div
                        onClick={() => {
                          setResource(data.Resource);
                          setRedirect(true);
                        }}
                        className=" card mx-auto"
                      >
                        <img
                          className="mx-auto d-block"
                          src={
                            data.Resource === "Remdisivir"
                              ? "remidesvir.png"
                              : "" || data.Resource === "Oxygen tank"
                              ? "oxygen tank.png"
                              : "" || data.Resource === "Ambulance "
                              ? "ambulance.png"
                              : "" || data.Resource === "Beds"
                              ? "beds.png"
                              : "" || data.Resource === "Plasma"
                              ? "plasma.png"
                              : "" || data.Resource === "Medical stores"
                              ? "pharmacist.png"
                              : "" || data.Resource === "Covid Food services"
                              ? "food-service.png"
                              : "" ||
                                data.Resource ===
                                  "Inhouse home quarantine consultants"
                              ? "quarantine consultants.png"
                              : "" || data.Resource === "Blood banks"
                              ? "blood-bank.png"
                              : ""
                          }
                          alt="oxygen"
                        />
                        <h6 className="ctitle">{data.Resource}</h6>
                        <p style={{ color: "gray", textAlign: "center" }}>
                          {data.Count}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Resources;
