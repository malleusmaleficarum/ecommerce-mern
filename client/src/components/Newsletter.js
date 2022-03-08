import styled from "styled-components";
import SendIcon from "@mui/icons-material/Send";
import { mobile, tablet } from "../responsive";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { publicRequest } from "../requestMethods";

const Container = styled.div`
  height: 50vh;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  ${mobile({ height: "30vh" })}
  ${tablet({ height: "40vh" })}
`;

const Title = styled.h1`
  font-size: 60px;
  margin-bottom: 10px;
  ${mobile({ textAlign: "center", fontSize: "40px" })}
  ${tablet({ textAlign: "center", fontSize: "45px" })}
`;

const Description = styled.div`
  font-size: 20px;
  font-weight: 300;
  margin-bottom: 10px;
  ${mobile({ textAlign: "center", fontSize: "16px;" })}
  ${tablet({ fontSize: "18px" })}
`;

const Form2 = styled(Form)`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  ${mobile({ height: "30px" })}
  ${tablet({ height: "35px" })}
`;

const Input = styled(Field)`
  border: none;
  flex: 8;
  padding-left: 10px;

  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  flex: 1;
  border: none;
  background-color: black;
  color: white;
  cursor: pointer;

  &:hover {
    opacity: 90%;
  }

  &:disabled {
    cursor: default;
    opacity: 100%;
  }
`;

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("The email is incorrect")
    .required("Please enter your email"),
});

const Newsletter = () => {
  const handleSubmit = async (values) => {
    console.log(values);
    try {
      await publicRequest.post("/mailchimp/subscribe", values);
    } catch (error) {}
  };

  return (
    <Container>
      <Title>Newsletter</Title>
      <Description>Get timely updates from your favorite products</Description>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form2>
            <InputContainer>
              <Input name="email" placeholder="youremail@email.com" />
              <Button disabled={!formik.isValid || !formik.dirty} type="submit">
                <SendIcon fontSize="small" />
              </Button>
            </InputContainer>
            <ErrorMessage name="email">
              {(msg) => (
                <div style={{ color: "red", fontSize: "12px" }}>{msg}</div>
              )}
            </ErrorMessage>
          </Form2>
        )}
      </Formik>
    </Container>
  );
};

export default Newsletter;
