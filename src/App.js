import React from "react";
import { ReactiveBase } from "@appbaseio/reactivesearch";
import { BrowserRouter as Router } from "react-router-dom";

import Navbar from "./components/Navbar";
import RouteComponent from "./components/RouteComponent";

import "./styles.css";
import { APP, CRED } from "./constants";

const App = () => {
  return (
    <ReactiveBase
      app={APP}
      credentials={CRED}
      mapKey="AIzaSyBQdVcKCe0q_vOBDUvJYpzwGpt_d_uTj4Q"
      theme={{
        colors: {
          primaryColor: "#2f54eb"
        }
      }}
    >
      <Router>
        <Navbar />
        <RouteComponent />
      </Router>
    </ReactiveBase>
  );
};

export default App;
