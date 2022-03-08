import { Carousel } from "react-responsive-carousel";
import styled from "styled-components";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Container = styled.div``;

const ContainerCarousel = styled.div``;

const SliderCarousel = () => {
  return (
    <Container>
      <Carousel
        autoPlay
        showThumbs={false}
        showStatus={false}
        swipeable={true}
        showArrows={false}
        infiniteLoop={true}
      >
        <ContainerCarousel>
          <img
            alt=""
            src="https://cdn.shopify.com/s/files/1/0271/0109/files/banner_sig-sp01.jpg?v=1639476047"
          />
        </ContainerCarousel>
        <ContainerCarousel>
          <img
            alt=""
            src="https://cdn.shopify.com/s/files/1/0271/0109/files/website_banner.jpg?v=1613631336"
          />
        </ContainerCarousel>
        <ContainerCarousel>
          <img
            alt=""
            src="https://cdn.shopify.com/s/files/1/0271/0109/files/CHAPTER_2.jpg?v=1639417620"
          />
        </ContainerCarousel>
      </Carousel>
    </Container>
  );
};

export default SliderCarousel;
