import { Link } from "react-router-dom";
import styled from "styled-components";

const Info = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.5s ease;
`;

const Image = styled.img`
  height: 75%;
  object-fit: cover;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

const Title = styled.h1`
  font-size: 14px;
`;

const Price = styled.span`
  font-size: 12px;
`;

const Product2 = ({ item }) => {
  return (
    <Container>
      <Image src={item.img} />
      <Link
        style={{ textDecoration: "none", color: "black" }}
        to={`/product/${item._id}`}
      >
        <Info>
          <Title>{item.title}</Title>
          <Price>{item.price} USD</Price>
        </Info>
      </Link>
    </Container>
  );
};

export default Product2;
