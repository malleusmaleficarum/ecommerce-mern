import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: black;
  border-top: 0.1px solid #7e7e7e;
  padding: 20px;
  ${mobile({ flexDirection: "column", padding: "15px;" })}
`;

const Left = styled.div`
  flex: 1;
  font-size: 11px;
  color: #7e7e7e;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  ${mobile({ marginTop: "5px" })}
`;
const Icon = styled.div`
  font-size: 25px;
  margin-left: 15px;
  color: #7e7e7e;
  ${mobile({ fontSize: "20px", marginLeft: "10px" })}
`;

const FooterCopyright = () => {
  return (
    <Container>
      <Left>Copyright © 2022 MALEFICARUM. All rights reserved</Left>
      <Right>
        <Icon>
          <i className="fab fa-cc-visa"></i>
        </Icon>
        <Icon>
          <i className="fab fa-cc-mastercard"></i>
        </Icon>
        <Icon>
          <i className="fab fa-cc-paypal"></i>
        </Icon>
        <Icon>
          <i className="fab fa-ethereum"></i>
        </Icon>
        <Icon>
          <i className="fab fa-bitcoin"></i>
        </Icon>
      </Right>
    </Container>
  );
};

export default FooterCopyright;
