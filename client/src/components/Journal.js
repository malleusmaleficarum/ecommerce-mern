import styled from "styled-components";
import moment from "moment";
import { Link } from "react-router-dom";

const Journal = ({ item }) => {
  // const editorState = EditorState.createWithContent(
  //   convertFromRaw(JSON.parse(item.desc))
  // );
  return (
    <Container to={`/journal/${item._id}`}>
      <LeftImg alt="" src={item.image} />
      <RightContent>
        <ContentWrapper>
          <Title>{item.title}</Title>

          <Desc>Put description in here</Desc>
        </ContentWrapper>
        <InfoWrapper>
          <Cats>{item.categories.join(", ")}</Cats>
          <Info>{moment(item.createdAt).format("DD MMMM YYYY")}</Info>
        </InfoWrapper>
      </RightContent>
    </Container>
  );
};

const Container = styled(Link)`
  display: flex;
  border-bottom: 1px solid #000;
  padding: 30px 0;
  text-decoration: none;
`;

const LeftImg = styled.img`
  flex: 1;
  max-width: 50%;
  max-height: 350px;
  object-fit: cover;
`;

const RightContent = styled.div`
  flex: 1;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ContentWrapper = styled.div``;

const Title = styled.h1`
  color: black;
  margin-bottom: 20px;
  letter-spacing: -1px;
  font-size: 27px;
`;

const Desc = styled.span`
  -webkit-line-clamp: 4;
  line-clamp: 4;
  font-size: 16px;
`;

const InfoWrapper = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
`;

const Cats = styled.span``;

const Info = styled.span``;

export default Journal;
