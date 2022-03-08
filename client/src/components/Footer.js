import styled from "styled-components";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import FacebookIcon from "@mui/icons-material/Facebook";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { mobile, tablet } from "../responsive";

const Container = styled.div`
  display: flex;
  background-color: black;
  ${mobile({ flexDirection: "column" })}
  ${tablet({ flexDirection: "column" })}
`;
const Left = styled.div`
  flex: 1;
  padding: 20px;
  ${tablet({ padding: "10px 20px" })}
`;

const Title = styled.h3`
  margin-bottom: 10px;
  color: #7e7e7e;
  ${mobile({ fontSize: "15px" })}
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 5px;
  font-size: 12px;
  color: #7e7e7e;
  cursor: pointer;

  &:hover {
    color: white;
  }
  ${mobile({ fontSize: "10px" })}
`;

const Center = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #7e7e7e;
  cursor: pointer;

  &:hover {
    color: white;
  }
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${tablet({ padding: "10px 20px", paddingTop: "0px" })}
`;

const ContactItem = styled.div`
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #7e7e7e;
  ${mobile({ fontSize: "10px" })}
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Title>Links</Title>
        <List>
          <ListItem>CUSTOMER CARE</ListItem>
          <ListItem>MEASUREMENT GUIDE</ListItem>
          <ListItem>FAQs</ListItem>
          <ListItem>TERMS AND CONDITIONS</ListItem>
          <ListItem>PRIVACY POLICY</ListItem>
          <ListItem>PAYMENT CONFIRMATION</ListItem>
          <ListItem>TRACKING</ListItem>
          <ListItem>WISHLIST</ListItem>
          <ListItem>MY ACCOUNT</ListItem>
        </List>
      </Left>

      <Center>
        <Title>Social Media</Title>
        <SocialContainer>
          <SocialIcon>
            <InstagramIcon fontSize="small" />
          </SocialIcon>
          <SocialIcon>
            <PinterestIcon fontSize="small" />
          </SocialIcon>
          <SocialIcon>
            <FacebookIcon fontSize="small" />
          </SocialIcon>
        </SocialContainer>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <LocationOnIcon fontSize="small" style={{ marginRight: "10px" }} />
          South Dunedin, Dunedin 9012, New Zealand
        </ContactItem>
        <ContactItem>
          <PhoneEnabledIcon fontSize="small" style={{ marginRight: "10px" }} />
          +1 234 567 89
        </ContactItem>
        <ContactItem>
          <MailOutlineIcon fontSize="small" style={{ marginRight: "10px" }} />
          contact@maleficarum.com
        </ContactItem>
      </Right>
    </Container>
  );
};

export default Footer;
