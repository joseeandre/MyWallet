import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignIn from "./Login/SignIn";
import SignUp from "./Login/SignUp";
import Homepage from "./Homepage/Homepage";
import AddTransaction from "./AddTransaction/AddTransaction";


export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <SignIn></SignIn>
        </Route>
        <Route path="/sign-up" exact>
          <SignUp></SignUp>
        </Route>
        <Route path="/home" exact>
          <Homepage></Homepage>
        </Route>
        <Route path="/transactions/:id" exact>
          <AddTransaction></AddTransaction>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
