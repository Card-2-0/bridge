import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Messages } from "../components/Messages";
import { Login } from "../components/Login";
import { UserLeft } from "../components/UserLeft";
import { Home } from "../components/Home";
import { Rules } from "../components/Rules";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact={true} component={Login} />
      <Route path="/game" exact component={Messages} />
      <Route path="/left" exact component={UserLeft} />
      <Route path="/home" exact component={Home} />
      <Route path="/rules" exact component={Rules} />
    </BrowserRouter>
  );
};
