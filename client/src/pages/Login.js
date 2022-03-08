import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Footer from "../components/Footer";
import FooterCopyright from "../components/FooterCopyright";
import NavbarWrap from "../components/NavbarWrap";
import { login } from "../redux/apiCalls";
import { mobile, tablet } from "../responsive";

const Container = styled.div``;

const ContainerWrapper = styled.div`
  height: 95vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${mobile({ height: "50vh" })}
  ${tablet({ height: "70vh" })}
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  ${mobile({ width: "60%" })}
  ${tablet({ width: "40%" })}
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
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  background-color: #f0f0f0;
  border: none;
`;

const Button = styled.button`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
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
  &:disabled {
    color: white;
    background-color: gray;
    cursor: not-allowed;
  }
`;

const Cont = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Link = styled.a`
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  text-align: center;
  color: red;
  font-weight: 600;
  font-size: 13px;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

  return (
    <Container>
      <NavbarWrap />
      <ContainerWrapper>
        <Wrapper>
          <Title>LOGIN</Title>
          <Form>
            <Input
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            ></Input>
            <Input
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
            <Button onClick={handleClick} disabled={isFetching}>
              LOGIN
            </Button>
            {error && <Error>Wrong Credentials</Error>}
          </Form>
          <Cont>
            <Link>Forgot Password</Link>
            <Link>Register</Link>
          </Cont>
        </Wrapper>
      </ContainerWrapper>
      <Footer />
      <FooterCopyright />
    </Container>
  );
};

export default Login;
