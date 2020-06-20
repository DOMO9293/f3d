import React, { useState, useEffect } from "react";
import Form from "./Form";
import CustomButton from "../global/CustomButton";
import { auth, createUserProfileDocument } from "../firebase/firebase.utils";
import styled from "styled-components";

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
    <Container>
      <h1> Sign up</h1>
      <form>
        <Input
          name="displayName"
          type="text"
          placeholder="Name"
          value={userData.displayName}
          onChange={handleChange}
        />
        <Input
          name="email"
          type="email"
          placeholder="email"
          value={userData.email}
          onChange={handleChange}
        />
        <Input
          name="password"
          type="password"
          placeholder="password"
          value={userData.password}
          onChange={handleChange}
        />
        <Input
          name="confirmPassword"
          type="text"
          placeholder="confirmPassword"
          value={userData.confirmPassword}
          onChange={handleChange}
        />
        <div>
          <CustomButton onClick={handleSubmit}>Sign Up</CustomButton>
        </div>
      </form>
    </Container>
  );
}

export default SignUp;
const Container = styled.div`
  margin: 30px;
  height: 92vh;
  background-color: pink;
  border-radius: 15px;
  flex: 1;
  padding: 10px;
  & > h2 {
    margin-top: 50px;
    flex: 1;
  }
  text-align: center;
  align-items: center;
  justify-content: center;
`;
const Input = styled.input`
  display: inline-block;
  flex: 1;
  left: 50%;
  height: 30px;
  border: 0;
  outline: 0;
  background: transparent;
  border-bottom: 1px solid black;
  width: 50%;
  margin: 20px;
`;
