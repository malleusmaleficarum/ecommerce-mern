import styled from "styled-components";
import Footer from "../components/Footer";
import FooterCopyright from "../components/FooterCopyright";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { mobile, tablet } from "../responsive";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/cartRedux";
import Navbar2 from "../components/Navbar2";
import Announcement from "../components/Announcement";

const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;
  padding: 50px;
  ${(mobile, tablet({ flexDirection: "column", padding: "10px" }))}
`;

const ImageContainer = styled.div`
  flex: 1;
  overflow-y: scroll;
  height: 500px;
  /* width */
  ::-webkit-scrollbar {
    width: 8px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #aaa9a8;
    border-radius: 10px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #6a6866;
  }
  ${tablet({ height: "unset", overflowY: "unset" })}
`;

const Image = styled.img`
  align-items: center;
  width: 100%;
  height: 95vh;
  object-fit: cover;
  ${mobile({ height: "60vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 40px;
  margin-left: 5px;
  ${mobile({ padding: "0 10px", marginTop: "10px" })}
`;

const Title = styled.h1`
  border-top: 1px solid black;
  letter-spacing: -2px;
  font-size: 35px;
  ${mobile({ fontSize: "25px" })}
`;

const Desc = styled.p`
  font-size: 15px;
  ${mobile({ fontSize: "12px;" })}
`;

const Price = styled.p`
  margin: 30px 0;
  font-weight: 700;
  font-size: 18px;
  border-top: 1px dotted black;
  border-bottom: 1px dotted black;
  ${mobile({ fontSize: "15px;", margin: "15px 0" })}
`;

const FilterContainer = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  border-top: 1px dotted black;
  border-bottom: 1px dotted black;
  padding: 10px 0px;
  ${mobile({ fontSize: "15px;", margin: "15px 0" })}
`;

const Filter = styled.span`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.div`
  font-weight: 700;
  font-size: 13px;
`;

const FilterColor = styled.div`
  height: 25px;
  width: 25px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 3px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
`;

const FilterSizeOption = styled.option`
  font-size: 12px;
`;

const AddContainer = styled.div`
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid black;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
`;

const AddTitle = styled.p`
  font-weight: 700;
  font-size: 13px;
  margin-right: 10px;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border: 1px solid lightgray;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 5px;
  font-size: 12px;
`;

const Button = styled.button`
  padding: 13px;
  background-color: black;
  color: white;
  font-size: 11px;
  font-weight: 800;
  border: 1px solid black;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: white;
    color: black;
  }
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
      } catch (err) {}
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    //update cart
    dispatch(addProduct({ ...product, quantity, color, size })); //dispatch to tell our program that is redux action
  };

  return (
    <Container>
      <Announcement />
      <Navbar2 />
      <Wrapper>
        <ImageContainer>
          <Image src={product.img} />
        </ImageContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Price>PRICE: ${product.price}</Price>
          <Desc>{product.desc}</Desc>
          <FilterContainer>
            <Filter>
              <FilterTitle>COLOR:</FilterTitle>
              {/* optional chaining because of nested properties*/}
              {product.color?.map((c) => (
                <FilterColor color={c} key={c} onClick={() => setColor(c)} />
              ))}
            </Filter>
            <Filter>
              <FilterTitle>SIZE:</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                {product.size?.map((s) => (
                  <FilterSizeOption key={s}>{s}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <AddTitle>QUANTITY:</AddTitle>
              <RemoveIcon
                fontSize="small"
                onClick={() => handleQuantity("dec")}
              />
              <Amount>{quantity}</Amount>
              <AddIcon fontSize="small" onClick={() => handleQuantity("inc")} />
            </AmountContainer>
            <Button onClick={handleClick}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Footer />
      <FooterCopyright />
    </Container>
  );
};

export default Product;
