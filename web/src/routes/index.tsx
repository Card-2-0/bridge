import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Messages } from "../components/Messages";
import { Login } from "../components/Login";
import { UserLeft } from "../components/UserLeft";
import { Home } from "../components/Home";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact={true} component={Login}></Route>
      <Route path="/game" exact component={Messages}></Route>
      <Route path="/left" exact component={UserLeft}></Route>
      <Route path="/home" exact component={Home} />
    </BrowserRouter>
  );
};
