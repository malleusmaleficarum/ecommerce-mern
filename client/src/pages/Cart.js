import styled from "styled-components";
import Footer from "../components/Footer";
import FooterCopyright from "../components/FooterCopyright";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { mobile, tablet } from "../responsive";
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { useNavigate } from "react-router-dom";
import Navbar2 from "../components/Navbar2";
import Announcement from "../components/Announcement";

//.env file in create-react-app MUST use prefix REACT_APP_**NAME**
const KEY = process.env.REACT_APP_STRIPE_KEY;

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  padding-bottom: 10px;
  font-size: 30px;
  font-weight: 700;
  letter-spacing: 5px;
  text-align: center;
  border-bottom: 1px solid #f0f0f0;
  ${mobile({ fontSize: "20px;" })}
`;

const Top = styled.div`
  margin-top: 10px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${(mobile, tablet({ display: "none" }))}
`;

const TopButton = styled.button`
  padding: 10px;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "white"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
  &:hover {
    opacity: 70%;
  }
`;

const TopTexts = styled.div``;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${(mobile, tablet({ flexDirection: "column" }))}
`;

const Info = styled.div`
  flex: 3;
`;

const Hr = styled.hr`
  background-color: #f0f0f0;
  border: none;
  height: 1px;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${(mobile, tablet({ flexDirection: "column" }))}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
  ${mobile({ width: "150px", objectFit: "contain" })}
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-size: 14px;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  margin: 5px;
  font-size: 15px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 17px;
  font-weight: 700;
  ${(mobile, tablet({ marginBottom: "15px" }))}
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-size: 25px;
  ${mobile({ fontSize: "20px" })}
`;

const SummaryItem = styled.div`
  margin: 20px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "700"};
  font-size: ${(props) => (props.type === "total" ? "20px" : "14px")};
  ${mobile({ margin: "15px 0px;" })}
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const SummaryButton = styled.button`
  width: 100%;
  margin-top: 30px;
  padding: 10px;
  font-size: 11px;
  font-weight: 700;
  border: white;
  color: white;
  background-color: black;
  cursor: pointer;
  &:hover {
    border: 1px solid black;
    color: black;
    background-color: white;
  }
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();
  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          //similar with axios.post("http://localhost***") but the localhost link has been created in requestMethods.js
          tokenId: stripeToken.id,
          amount: cart.total * 100,
        });
        navigate("/success", {
          state: { stripeData: res.data },
          products: cart,
        });
      } catch (err) {}
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart, navigate]);

  return (
    <Container>
      <Announcement />
      <Navbar2 />
      <Wrapper>
        <Title>YOUR CART</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Cart ({cart.products.length})</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT</TopButton>
        </Top>

        <Bottom>
          {cart.products.length === 0 ? (
            <span>Your cart is empty</span>
          ) : (
            <>
              <Info>
                {cart.products.map((product) => (
                  <Product key={product._id}>
                    <ProductDetail>
                      <Image src={product.img} />
                      <Details>
                        <ProductName>
                          <b>Product: </b>
                          {product.title}
                        </ProductName>
                        <ProductId>
                          <b>ID: </b> {product._id}
                        </ProductId>
                        <ProductColor color={product.color} />
                        <ProductSize>
                          <b>Size: </b> {product.size}
                        </ProductSize>
                      </Details>
                    </ProductDetail>
                    <PriceDetail>
                      <ProductAmountContainer>
                        <RemoveIcon fontSize="small" />
                        <ProductAmount>{product.quantity}</ProductAmount>
                        <AddIcon fontSize="small" />
                      </ProductAmountContainer>
                      <ProductPrice>
                        ${product.price * product.quantity}
                      </ProductPrice>
                    </PriceDetail>
                  </Product>
                ))}
                <Hr />
              </Info>
              <Summary>
                <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                <SummaryItem>
                  <SummaryItemText>Subtotal</SummaryItemText>
                  <SummaryItemPrice>${cart.total}</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Estimated Shipping</SummaryItemText>
                  <SummaryItemPrice>$6.0</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Shipping Discount</SummaryItemText>
                  <SummaryItemPrice>$-6.0</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem type="total">
                  <SummaryItemText>Total</SummaryItemText>
                  <SummaryItemPrice>${cart.total}</SummaryItemPrice>
                </SummaryItem>
                <StripeCheckout
                  nama="MALEFICARUM"
                  image="https://i.pinimg.com/originals/8f/3f/99/8f3f994a730349bf0b083b02086e42b1.jpg"
                  billingAddress
                  shippingAddress
                  description={`Your total is $${cart.total}`}
                  amount={cart.total * 100}
                  token={onToken}
                  stripeKey={KEY}
                >
                  <SummaryButton>CHECKOUT NOW</SummaryButton>
                </StripeCheckout>
              </Summary>
            </>
          )}
        </Bottom>
      </Wrapper>
      <Footer />
      <FooterCopyright />
    </Container>
  );
};

export default Cart;
