import { useState } from "react";
import styled from "styled-components";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Badge } from "@mui/material";
import { mobile, tablet } from "../responsive";
import MenuIcon from "@mui/icons-material/Menu";
import { useMediaQuery } from "react-responsive";
import NavbarMobile from "./NavbarMobile";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/userRedux";

const Container = styled.div`
  height: 60px;
  border-bottom: 1px solid lightgrey;
  background-color: white;
  box-shadow: 2px 1px 6px -3px rgba(0, 0, 0, 0.66);
  -webkit-box-shadow: 2px 1px 6px -3px rgba(0, 0, 0, 0.66);
  -moz-box-shadow: 2px 1px 6px -3px rgba(0, 0, 0, 0.66);
  z-index: 50;
  position: sticky;
  top: 0;
`;

const Wrapper = styled.div`
  padding: 14px 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({ justifyContent: "space-between" })}
`;

const LeftNav = styled.div`
  flex: 0.7;
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
  ${mobile({ display: "none" })}
`;

const CenterMenu = styled.ul`
  list-style: none;
  display: flex;
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
  ${tablet({ display: "none" })}
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
  color: #333;
`;

const Hamburger = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: -10px;
  display: none;
  ${tablet({ display: "initial" })}
`;

const StyledLink = styled(Link)`
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const Navbar2 = () => {
  const isMobile = useMediaQuery({ maxWidth: "768px" });
  const [toggle, setToggle] = useState(false);
  const [toggleHam, setToggleHam] = useState(false);
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(logout());
  };

  const handleSearch = (e) => {
    let search = e.target.value;
    if (e.keyCode === 13) {
      // enter pressed
      navigate(`/products?search=${search}`);
    }
  };

  return (
    <Container>
      <Wrapper>
        <LeftNav>
          <StyledLink to="/">
            <LogoImg src="https://cdn.shopify.com/s/files/1/0271/0109/t/27/assets/logo.png?v=13649336559752850719"></LogoImg>
          </StyledLink>
        </LeftNav>
        <CenterNav>
          <CenterMenu>
            <StyledLink to="/products">
              <CenterItem>SHOP</CenterItem>
            </StyledLink>
            <StyledLink to="/journals">
              <CenterItem>JOURNAL</CenterItem>
            </StyledLink>
            <StyledLink to="/contact">
              <CenterItem>CONTACT</CenterItem>
            </StyledLink>
            <CenterItem>SALE</CenterItem>
          </CenterMenu>
        </CenterNav>
        <RightNav>
          <SearchContainer>
            <Input
              placeholder="Search Products.."
              toggle={toggle}
              onKeyDown={handleSearch}
            />
            <SearchOutlinedIcon
              style={{ color: "gray", cursor: "pointer" }}
              onClick={() => setToggle(!toggle)}
              fontSize="small"
            />
          </SearchContainer>
          {user ? (
            <MenuItem onClick={onClick}>LOGOUT</MenuItem>
          ) : (
            <>
              <StyledLink to="/register">
                <MenuItem>REGISTER</MenuItem>
              </StyledLink>
              <StyledLink to="/login">
                <MenuItem>LOGIN</MenuItem>
              </StyledLink>
            </>
          )}
          <MenuItem>
            <StyledLink to="/cart">
              <Badge badgeContent={quantity} color="primary">
                <ShoppingBagOutlinedIcon fontSize="small" />
              </Badge>
            </StyledLink>
          </MenuItem>
        </RightNav>
        <Hamburger>
          {isMobile && toggleHam ? (
            <CloseIcon onClick={() => setToggleHam(!toggleHam)} />
          ) : (
            <MenuIcon onClick={() => setToggleHam(!toggleHam)} />
          )}
          {isMobile && <NavbarMobile toggleHam={toggleHam} />}
        </Hamburger>
      </Wrapper>
    </Container>
  );
};

export default Navbar2;
