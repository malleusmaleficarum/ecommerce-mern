import styled from "styled-components";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { sliderItems } from "../data";
import { useState } from "react";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: white;
  position: relative;
  overflow: hidden;
  ${mobile({ height: "50vh" })}
`;
const Arrow = styled.div`
  width: 25px;
  height: 25px;
  background-color: lightgray;
  opacity: 70%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  cursor: pointer;
  z-index: 2;
  &:hover {
    opacity: 100%;
  }
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  position: relative;
  background-color: gray;
  transition: all 0.5s linear;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  height: 100vh;
  width: 100vw;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// const ImgContainer = styled.div`
//   height: 100%;
//   flex: 1;
// `;

const Image = styled.img`
  height: 100%;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  padding: 50px;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  bottom: 0;
  left: 10%;
`;

const Title = styled.h2`
  font-size: 35px;
  letter-spacing: -2px;
  font-weight: 700;
`;
const Desc = styled.p`
  margin: 8px 0px;
  font-size: 14px;
`;
const Button = styled.button`
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  border: none;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    opacity: 90%;
  }
`;

const Slider2 = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (dir) => {
    if (dir === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : sliderItems.length - 1);
    } else {
      setSlideIndex(slideIndex < sliderItems.length - 1 ? slideIndex + 1 : 0);
    }
  };

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftIcon />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item) => (
          <Slide key={item.id}>
            <Image src={item.img} />
            {item.isInfo && (
              <InfoContainer>
                <Title>{item.title}</Title>
                <Desc>{item.desc}</Desc>
                <Button>SHOP NOW</Button>
              </InfoContainer>
            )}
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right">
        <ArrowRightIcon onClick={() => handleClick("right")} />
      </Arrow>
    </Container>
  );
};

export default Slider2;
