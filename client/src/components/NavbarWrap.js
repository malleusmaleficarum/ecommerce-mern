import styled from "styled-components";
import Announcement from "./Announcement";
import Navbar2 from "./Navbar2";

const Container = styled.div`
  /* position: sticky;
  top: 0;
  z-index: 50; */
`;

const NavbarWrap = () => {
  return (
    <Container>
      <Announcement />
      <Navbar2 />
    </Container>
  );
};

export default NavbarWrap;
