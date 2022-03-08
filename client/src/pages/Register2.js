import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Footer from "../components/Footer";
import FooterCopyright from "../components/FooterCopyright";
import NavbarWrap from "../components/NavbarWrap";
import { mobile, tablet } from "../responsive";
import RegisterInput from "./RegisterInput";
import { register } from "../redux/apiCalls";
import { useNavigate } from "react-router-dom";

const Container = styled.div``;

const ContainerWrapper = styled.div`
  height: 95vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${mobile({ height: "70vh" })}
`;

const Wrapper = styled.div`
  width: 30%;
  padding: 20px;
  ${mobile({ width: "60%" })}
  ${tablet({ width: "50%" })}
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: 700;
  letter-spacing: 5px;
  margin-bottom: 15px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  /* & input:invalid {
    border: 1px red solid;
  } */

  & input:invalid ~ p {
    display: block;
  }
`;

const Agreement = styled.p`
  width: 100%;
  font-size: 12px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  width: 100%;
  padding: 8px;
  font-size: 11px;
  font-weight: 700;
  border: 1px solid white;
  background-color: black;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    border: 1px solid black;
    background-color: white;
    color: black;
  }
`;

const HaveAccount = styled.p`
  width: 100%;
  font-size: 12px;
  margin-top: 10px;
  cursor: pointer;
  text-decoration: underline;
`;

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.register);
  const [values, setValues] = useState({
    firstname: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const inputs = [
    {
      id: "1",
      name: "firstname",
      type: "text",
      placeholder: "First Name",
      errorMessage: "*Please enter at least 2 character",
      pattern: "[A-Za-z]{1,20}",
      required: true,
    },
    {
      id: "2",
      name: "lastName",
      type: "text",
      placeholder: "Last Name",
      errorMessage: "*Please enter at least 2 character",
      pattern: "[A-Za-z]{1,20}",
      required: true,
    },
    {
      id: "3",
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage: "*Please enter 3-16 character without special character",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: "4",
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "*Please enter a valid email address",
      required: true,
    },
    {
      id: "5",
      name: "password",
      type: "text",
      placeholder: "Password",
      errorMessage:
        "*Min 8 character with 1 letter, 1 number, and 1 special character",
      pattern: `(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$`,
      required: true,
    },
    {
      id: "6",
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Password does not match",
      pattern: values.password,
      required: true,
    },
  ];

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(dispatch, { ...values });
  };

  useEffect(() => {
    if (error === false) {
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    }
  }, [error, navigate]);

  return (
    <Container>
      <NavbarWrap />
      <ContainerWrapper>
        <Wrapper>
          <Title>REGISTER</Title>
          {error === false && (
            <span>register successful we will redirect you to login page</span>
          )}
          {error === true && <span>something went wrong</span>}
          <Form onSubmit={handleSubmit}>
            {inputs.map((input) => (
              <RegisterInput
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
              />
            ))}
            <Agreement>
              By creating an account, I consent to the processing of my personal
              data in accordance with the <b> PRIVACY POLICY </b>
            </Agreement>
            <Button>REGISTER</Button>
          </Form>
          <HaveAccount>Have an account? Login</HaveAccount>
        </Wrapper>
      </ContainerWrapper>
      <Footer />
      <FooterCopyright />
    </Container>
  );
};

export default Register;
