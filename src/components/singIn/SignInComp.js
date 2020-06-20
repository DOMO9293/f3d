import React, { useState, useEffect } from "react";
import CustomButton from "../global/CustomButton";
import styled from "styled-components";
import {
  auth,
  createUserProfileDocument,
  signInWithGoogle,
} from "../firebase/firebase.utils";

function SignInComp() {
  const [state, setValue] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = state;
    try {
      await auth.signInWithEmailAndPassword(email, password);

      setValue({ email: "", password: "" });
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(state);
    setValue({ ...state, [name]: value });
  };
  return (
    <Container>
      <h2>Sing In</h2>
      <form onSubmit={handleSubmit}>
        <Input
          name="email"
          type="email"
          placeholder="email"
          value={state.email}
          onChange={handleChange}
          required
        />
        <Input
          name="password"
          type="password"
          placeholder="password"
          value={state.password}
          onChange={handleChange}
          required
        />
        <div>
          <CustomButton type="submit" value="Submit Form">
            SignIn
          </CustomButton>
          <CustomButton
            type="button"
            onClick={signInWithGoogle}
            value="Submit Form"
          >
            SignIn with google
          </CustomButton>
        </div>
      </form>
    </Container>
  );
}

export default SignInComp;

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
