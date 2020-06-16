import React, { useState, useEffect } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "./pages/home";
import SignIn from "./pages/SignIn";
import Header from "./components/global/Header";
import Scrap from "./pages/Scrap";
import {
  auth,
  createUserProfileDocument,
} from "./components/firebase/firebase.utils";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";

function App(props) {
  const { setCurrentUser } = props;
  const { currentUser } = props;
  console.log("hiprops", props.currentUser);
  useEffect(() => {
    const userChange = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((sS) => {
          setCurrentUser({
            id: sS.id,
            ...sS.data(),
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
    });

    return () => userChange();
  }, []);

  return (
    <>
      <Header />

      <Route
        path="/"
        exact={true}
        render={(props) => <Home {...props} currentUser={currentUser} />}
      />
      {currentUser && (
        <Route
          path="/scrap"
          exact={true}
          render={(props) => <Scrap {...props} currentUser={currentUser} />}
        />
      )}

      <Route
        path="/signin"
        exact={true}
        render={() => (props.currentUser ? <Redirect to="/" /> : <SignIn />)}
      />
    </>
  );
}

const mapStateToProps = ({ user: { currentUser } }) => ({
  currentUser,
});
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
