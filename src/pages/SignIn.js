import React from "react";
import SignInComp from "../components/singIn/SignInComp";
import SignUp from "../components/singIn/SignUp";
import styled from "styled-components";
function SignIn() {
  return (
    <Wrapper>
      <SignInComp />
      <SignUp />
    </Wrapper>
  );
}

export default SignIn;
const Wrapper = styled.div`
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
`;
