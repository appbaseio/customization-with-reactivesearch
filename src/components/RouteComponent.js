import React from "react";
import { Switch, Route } from "react-router-dom";
import CustomComponent from "../pages/CustomComponent";
import Home from "../pages/Home";
import Interaction from "../pages/Interaction";

const RouteComponent = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/custom-component" component={CustomComponent} />
      <Route exact path="/interactions" component={Interaction} />
    </Switch>
  );
};

export default RouteComponent;
