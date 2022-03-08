import styled from "styled-components";
import Announcement from "../components/Announcement";
import Journal from "../components/Journal";
import Navbar2 from "../components/Navbar2";
import { useDispatch, useSelector } from "react-redux";
import { getJournals } from "../redux/apiCalls";
import { useEffect } from "react";

const Journals = () => {
  const dispatch = useDispatch();
  const journalData = useSelector((state) => state.journal.journals);

  useEffect(() => {
    getJournals(dispatch);
  }, [dispatch]);

  return (
    <Container>
      <Announcement />
      <Navbar2 />
      <Wrapper>
        <ImgBanner
          src="https://images1.the-dots.com/2699992/channels4-banner.jpeg?p=cover"
          alt="banner"
        />
        {journalData
          ? journalData.map((item, i) => <Journal item={item} key={i} />)
          : "Loading..."}
      </Wrapper>
    </Container>
  );
};

const Container = styled.div``;

const Wrapper = styled.div`
  margin: 20px 100px;
  padding: 20px;
  background-color: #f0f0f0;
`;

const ImgBanner = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  margin-bottom: 30px;
`;

export default Journals;
