import React, { useState, useEffect } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./pages/home";
import SignIn from "./pages/SignIn";
import Header from "./components/global/Header";
import {
  auth,
  createUserProfileDocument,
} from "./components/firebase/firebase.utils";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

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
      <Header currentUser={currentUser} />

      <Route path="/" exact={true} component={Home} />
      <Route path="/scrap" exact={true} component={SignIn} />
    </>
  );
}
