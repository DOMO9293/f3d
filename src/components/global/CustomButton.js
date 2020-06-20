import React from "react";
import styled from "styled-components";

function CustomButton({ children, ...props }) {
  return (
    <Button className="custom-button" {...props}>
      {children}
    </Button>
  );
}

export default CustomButton;

const Button = styled.button`
  background-color: blue;
  border-radius: 20px;
  padding: 15px;
  margin: 10px;
  border: none;
  color: white;
`;
