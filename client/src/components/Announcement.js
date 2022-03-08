import styled from "styled-components";
import { mobile } from "../responsive";

const Cointainer = styled.div`
  height: 30px;
  background-color: black;
  color: white;
  font-family: "Bebas Neue", cursive;
  font-size: 13px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 2px;
  z-index: 5;
  ${mobile({ height: "20px", fontSize: "10px" })}
`;

const Announcement = () => {
  return <Cointainer>FREE SHIPPING FOR ORDERS OVER $500</Cointainer>;
};

export default Announcement;
