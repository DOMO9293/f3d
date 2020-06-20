import React from "react";
import { auth } from "../firebase/firebase.utils";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
function Header({ currentUser, history }) {
  return (
    <Container>
      {currentUser ? (
        <Element onClick={() => auth.signOut()}>sign out</Element>
      ) : (
        <Element onClick={() => history.push("/signin")}>Sign In</Element>
      )}
      <Element>HOME</Element>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default withRouter(connect(mapStateToProps)(Header));

const Container = styled.div`
  font-weight: bold;
  font-size: 18px;
  color: black;
  padding: 10px;
  position: absolute;
  display: inline-block;
  top: 100;
  left: 85%;
  z-index: 100;
`;

const Element = styled.div`
  margin-left: 20px;
  display: inline-block;
`;
