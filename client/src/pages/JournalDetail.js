import styled from "styled-components";
import Navbar2 from "../components/Navbar2";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import FooterCopyright from "../components/FooterCopyright";
import { useLocation } from "react-router-dom";
import { getJournals } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import moment from "moment";
import draftToHtml from "draftjs-to-html";
import { sanitize } from "dompurify";

const JournalDetail = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const journalId = location.pathname.split("/")[2];
  const journalData = useSelector((state) =>
    state.journal.journals.find((journal) => journal._id === journalId)
  );
  const descContent = journalData && draftToHtml(JSON.parse(journalData.desc));

  useEffect(() => {
    getJournals(dispatch);
  }, [dispatch]);

  return (
    <Container>
      <Announcement />
      <Navbar2 />
      {!journalData ? (
        "Loading..."
      ) : (
        <>
          <Wrapper>
            <TitleWrapper>
              <Title>{journalData.title}</Title>
              <TitleInfo>
                Menampilkan pattern camo custom yang terinspirasi dari pepohonan
                di LA.
              </TitleInfo>
            </TitleWrapper>
            <ImgWrapper>
              <Image alt="" src={journalData.image} />
            </ImgWrapper>
            <JournalWrapper>
              <LeftInfo>
                <LeftInfoTop>
                  <Tanggal>
                    {moment(journalData.createdAt).format("DD MMMM YYYY")}
                  </Tanggal>
                  <Text>{journalData.categories.join(", ")}</Text>
                </LeftInfoTop>
                <LeftInfoBot>
                  <Text>SHARE</Text>
                  <ShareDiv>
                    <Icon>
                      <i className="fa-brands fa-facebook-f"></i>
                    </Icon>
                    <TextShare>Facebook</TextShare>
                  </ShareDiv>
                  <ShareDiv>
                    <Icon>
                      <i className="fa-regular fa-envelope"></i>
                    </Icon>
                    <TextShare>Email</TextShare>
                  </ShareDiv>
                  <ShareDiv>
                    <Icon>
                      <i className="fa-brands fa-whatsapp"></i>
                    </Icon>
                    <TextShare>Whatsapp</TextShare>
                  </ShareDiv>
                </LeftInfoBot>
              </LeftInfo>
              <RightContent>
                <Desc
                  dangerouslySetInnerHTML={{ __html: sanitize(descContent) }}
                />
              </RightContent>
            </JournalWrapper>
          </Wrapper>
        </>
      )}
      <Footer />
      <FooterCopyright />
    </Container>
  );
};

const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px 100px;
  padding: 20px;
  background-color: #f0f0f0;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  padding: 0px 100px;
  text-align: center;
  letter-spacing: -1px;
  margin-bottom: 5px;
`;

const TitleInfo = styled.span`
  font-style: italic;
  font-size: 15px;
  text-align: center;
`;

const ImgWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-around;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid lightgray;
`;

const Image = styled.img`
  width: 100%;
  max-height: 500px;
  object-fit: cover;
`;

const JournalWrapper = styled.div`
  display: flex;
`;

const LeftInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 70px;
  align-self: flex-start;
`;

const LeftInfoTop = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: gray;
  margin-bottom: 50px;
`;

const Tanggal = styled.span`
  font-size: 13px;
`;

const Text = styled.span`
  font-size: 13px;
`;

const LeftInfoBot = styled.div`
  display: flex;
  flex-direction: column;
`;

const ShareDiv = styled.div`
  margin: 5px 0;
  color: gray;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    color: black;
  }
`;

const Icon = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextShare = styled.span`
  font-size: 13px;
  margin-left: 10px;
`;

const RightContent = styled.div`
  flex: 3;
`;

const Desc = styled.div`
  font-size: 18px;
  span {
    background-color: transparent !important;
  }
`;

export default JournalDetail;
