import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/home";

export default function app() {
  return (
    <>
      <Route path="/" exact={true} component={Home} />
    </>
  );
}
