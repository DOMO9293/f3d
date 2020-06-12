import React, { useState, useEffect } from "react";
import styled from "styled-components";

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
        <input type="submit" value="Submit Form" />
      </form>
    </Container>
  );
}

export default Form;

const Container = styled.div`
  background-color: white;
  color: pink;
`;
