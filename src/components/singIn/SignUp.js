import React, { useState, useEffect } from "react";
import Form from "./Form";
import CustomButton from "../global/CustomButton";
import { auth, createUserProfileDocument } from "../firebase/firebase.utils";

function SignUp() {
  const [userData, setData] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { displayName, email, password, confirmPassword } = userData;

    if (password !== confirmPassword) {
      alert("password don't match");
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log({ user });
      await createUserProfileDocument(user, { displayName });
      setData({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (e) {
      console.log(e);
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...userData, [name]: value });
  };
  return (
    <>
      <h1> Sign up</h1>
      <form>
        <input
          name="displayName"
          type="text"
          value={userData.displayName}
          onChange={handleChange}
        />
        <input
          name="email"
          type="email"
          value={userData.email}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          value={userData.password}
          onChange={handleChange}
        />
        <input
          name="confirmPassword"
          type="text"
          value={userData.confirmPassword}
          onChange={handleChange}
        />
        <CustomButton onClick={handleSubmit}>Sign Up</CustomButton>
      </form>
    </>
  );
}

export default SignUp;
