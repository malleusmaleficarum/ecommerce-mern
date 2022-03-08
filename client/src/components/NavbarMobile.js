import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div``;

const CenterMenu = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  position: fixed;
  top: 91px;
  left: 0;
  background-color: white;
  transition: transform 300ms;
  transform: ${({ toggleHam }) =>
    toggleHam ? "translateX(0)" : "translateX(-100%)"};
  ${mobile({ top: "81px" })}
`;

const CenterItem = styled.li`
  margin: 10px 0;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;
  font-size: 10px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  background-color: white;
  justify-content: center;
  &:hover {
    opacity: 70%;
  }

  ${mobile({
    margin: "10px 20px",
    paddingBottom: "10px",
    fontSize: "9px;",
    justifyContent: "unset",
  })}
`;

const NavbarMobile = ({ toggleHam }) => {
  return (
    <Container>
      <CenterMenu toggleHam={toggleHam}>
        <CenterItem>SHOP</CenterItem>
        <CenterItem>JOURNAL</CenterItem>
        <CenterItem>CONTACT</CenterItem>
        <CenterItem>SALE</CenterItem>
        <CenterItem>REGISTER</CenterItem>
        <CenterItem>LOGIN</CenterItem>
      </CenterMenu>
    </Container>
  );
};

export default NavbarMobile;
