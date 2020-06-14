import React from "react";
import styled from "styled-components";

function CustomButton({ children, ...props }) {
  return (
    <button className="custom-button" {...props}>
      {children}
    </button>
  );
}

export default CustomButton;
