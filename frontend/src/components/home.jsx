import React, { Component, useState, useEffect } from "react";
import logo from "../assets/logo-high.png";
import { DropdownButton, Dropdown } from "react-bootstrap";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";
const {API} = require("../Api")

const useStyles = makeStyles({
  root: { padding: "10px" },
});

const Home = ({ history }) => {
  const [states, setStates] = useState();
  const classes = useStyles();

  useEffect(() => {
    fetch(`${API}/getallcities`)
      .then((res) => res.json())
      .then((res) => {
        setStates(res);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="conatiner">
      {states ? (
        <div className="back">
          <div className="foot">
            <img src={logo} alt="Logo" />
            <h1 id="name">Covid Resources India</h1>
           
            <p style={{fontSize : "20px" , textAlign : "center" }} >
            Find all your emergency needs in one place. Survival for a better
              tomorrow, India fights Covid-19.
              <br></br>
              Understanding the necessity and haste of the situation, we've stepped up for our loved country men and started an initiative - Covid Resources India. It is our humble initiative aimed at equipping people with the necessary links and resources throughout.
</p>
          </div>
          <div className="link-bottom text-center">
            <h5
              style={{
                margin: 0,

              }}
            >
              Select your State
            </h5>

            <Select id="btnn" classes={{ root: classes.root }} item xs={12}>
              <option value=" ">Choose Resource </option>
              {states.cities.map((data, index) => {
                return (
                  <option
                    onClick={() => {
                      history.push({
                        pathname: "/covires/resources",
                        state: { State: data.state },
                      });
                    }}
                    value={data.state} 
                  >
                    {" "}
                    {data.state}{" "}
                  </option>
                );
              })}
            </Select>

            {/* <DropdownButton id="btnn" title="Select Your City">
              <Dropdown.Item href="/covires/resources">Delhi</Dropdown.Item>
              <Dropdown.Item href="/covires/resources">Mumbai</Dropdown.Item>
              <Dropdown.Item href="/covires/resources">Pune</Dropdown.Item>
            </DropdownButton> */}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Home;
