import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import Home from "./components/home";
import Resources from "./components/resources";
import Providers from "./components/providers";
import Details from "./components/details";
import Admin from "./components/Admin"

function App() {
  return (
    <Router>
      <Route exact path="/covires" component={Home} />
      <Route path="/covires/resources" component={Resources} />
      <Route path="/covires/providers" component={Providers} />
      <Route path="/covires/details" component={Details} />
      <Route path="/covires/admin" component={Admin} />

    </Router>
  );
}

export default App;
