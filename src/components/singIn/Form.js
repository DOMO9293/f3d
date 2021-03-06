import React, { useState, useEffect } from "react";
import CustomButton from "../global/CustomButton";
import styled from "styled-components";
import { signInWithGoogle } from "../firebase/firebase.utils";

function Form() {
  const [state, setValue] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setValue({ email: "", password: "" });
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
        <input
          name="email"
          type="email"
          value={state.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          value={state.password}
          onChange={handleChange}
          required
        />
        <CustomButton type="submit" value="Submit Form">
          SignIn
        </CustomButton>
        <CustomButton onClick={signInWithGoogle} value="Submit Form">
          SignIn with google
        </CustomButton>
      </form>
    </Container>
  );
}

export default Form;

const Container = styled.div`
  background-color: white;
`;
