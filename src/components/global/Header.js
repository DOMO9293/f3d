import React from "react";
import { auth } from "../firebase/firebase.utils";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

function Header({ currentUser }) {
  return (
    <div>
      {currentUser ? (
        <div
          style={{ color: "black", left: "500px" }}
          onClick={() => auth.signOut()}
        >
          sign out 77777
        </div>
      ) : (
        <Link style={{ color: "black", left: "500px" }} to="/scrap">
          Sign in 77777
        </Link>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Header);
