import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div``;

const Span = styled.span`
  font-size: 11px;
  color: red;
  margin-bottom: 8px;
  display: none;
`;

const Input = styled.input`
  width: 95%;
  margin-bottom: 10px;
  padding: 8px;
  background-color: #f0f0f0;
  border: none;

  &:invalid[data-focused="true"] {
    border: 1px red solid;
  }

  &:invalid[data-focused="true"] ~ ${Span} {
    display: block;
  }
`;

const RegisterInput = (props) => {
  const { onChange, errorMessage, id, ...inputProps } = props;
  const [focused, setFocused] = useState(false);

  const handleBlur = () => {
    setFocused(true);
  };

  return (
    <Container>
      <Input
        {...inputProps}
        onChange={onChange}
        onBlur={handleBlur}
        onFocus={() =>
          inputProps.name === "confirmPassword" && setFocused(true)
        }
        data-focused={focused}
      />
      <Span>{errorMessage}</Span>
    </Container>
  );
};

export default RegisterInput;
