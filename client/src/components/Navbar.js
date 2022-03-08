import { useState } from "react";
import styled from "styled-components";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Badge } from "@mui/material";
import { mobile, tablet } from "../responsive";

const Container = styled.div`
  height: 60px;
  border-bottom: 1px solid lightgrey;
  background-color: white;
  box-shadow: 2px 1px 6px -3px rgba(0, 0, 0, 0.66);
  -webkit-box-shadow: 2px 1px 6px -3px rgba(0, 0, 0, 0.66);
  -moz-box-shadow: 2px 1px 6px -3px rgba(0, 0, 0, 0.66);
  z-index: 5;
`;

const Wrapper = styled.div`
  padding: 14px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeftNav = styled.div`
  flex: 0.7;
  border-right: 1px solid lightgray;
  ${mobile({ borderRight: "none" })}
`;

const LogoImg = styled.img`
  height: 35px;
  &:hover {
    cursor: pointer;
  }
  ${mobile({ height: "25px" })}
`;

const CenterNav = styled.div`
  flex: 2;
`;

const CenterMenu = styled.ul`
  list-style: none;
  display: flex;
  ${mobile({ display: "none" })}
  ${tablet({ display: "none" })}
`;

const CenterItem = styled.li`
  margin-right: 30px;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  color: #333;
  &:hover {
    opacity: 70%;
  }
`;

const RightNav = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 3px;
`;

const Input = styled.input`
  border: none;
  margin-right: 3px;
  border-bottom: 1px solid lightgrey;
  display: ${({ toggle }) => (toggle ? "block" : "none")};
  &:focus {
    outline: none;
  }
`;

const MenuItem = styled.div`
  cursor: pointer;
  font-size: 11px;
  margin-left: 20px;
`;

const Navbar = () => {
  //const [hamburger, setHamburger] = useState(false);
  const [toggle, setToggle] = useState(false);

  return (
    <Container>
      <Wrapper>
        <LeftNav>
          <LogoImg src="https://cdn.shopify.com/s/files/1/0271/0109/t/27/assets/logo.png?v=13649336559752850719"></LogoImg>
        </LeftNav>
        <CenterNav>
          <CenterMenu>
            <CenterItem>SHOP</CenterItem>
            <CenterItem>JOURNAL</CenterItem>
            <CenterItem>CONTACT</CenterItem>
            <CenterItem>SALE</CenterItem>
          </CenterMenu>
        </CenterNav>
        <RightNav>
          <SearchContainer>
            <Input placeholder="Search" toggle={toggle} />
            <SearchOutlinedIcon
              style={{ color: "gray", cursor: "pointer" }}
              onClick={() => setToggle(!toggle)}
              fontSize="small"
            />
          </SearchContainer>
          <MenuItem>REGISTER</MenuItem>
          <MenuItem>LOGIN</MenuItem>
          <MenuItem>
            <Badge badgeContent={3} color="primary">
              <ShoppingBagOutlinedIcon fontSize="small" />
            </Badge>
          </MenuItem>
          {/*hamburger && <MenuOutlinedIcon />*/}
        </RightNav>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
