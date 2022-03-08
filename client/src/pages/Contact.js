import styled from "styled-components";
import Footer from "../components/Footer";
import FooterCopyright from "../components/FooterCopyright";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef, useState } from "react";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { publicRequest } from "../requestMethods";
import Navbar2 from "../components/Navbar2";
import Announcement from "../components/Announcement";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "*Minimal 2 character")
    .required("*Please enter your name"),
  email: Yup.string()
    .email("*The email is incorrect")
    .required("*Please enter your email"),
  message: Yup.string()
    .min(10, "*Too short")
    .required("*Please enter your message"),
});

const Contact = () => {
  const [isVerified, setIsVerified] = useState(false);
  const reRef = useRef();

  const toastifySuccess = () => {
    toast("Form Sent!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      className: "submit-feedback success",
      toastId: "notifyToast",
    });
  };

  const handleSubmit = async (values) => {
    const { name, email, message } = values;

    try {
      const templateParams = {
        name,
        email,
        message,
      };
      await emailjs.send(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_USER_ID
      );
      toastifySuccess();
    } catch (e) {
      console.log(e);
    }
  };

  const onChange = async () => {
    const token = reRef.current.getValue();
    try {
      const res = await publicRequest.post("/auth/captcha", token);
      res.data.response === "Successful" && setIsVerified(true);
    } catch (error) {}
  };

  return (
    <>
      <Announcement />
      <Navbar2 />
      <Container>
        <LeftContent>
          <LeftContentWrapper>
            <TitleLeft>Need Help?</TitleLeft>
            <ContentLeft>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at
              velit non tortor dignissim varius eu id metus. Suspendisse
              potenti. Fusce lobortis a purus vitae ultrices. Praesent neque
              elit, elementum.
            </ContentLeft>
          </LeftContentWrapper>
        </LeftContent>
        <RightContent>
          <RightContentWrapper>
            <TitleRight>Contact Us</TitleRight>
            <ToastContainer />
            <Formik
              initialValues={{ name: "", email: "", message: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {(formik) => (
                <Form2>
                  <InputWrapper>
                    <Input name="name" placeholder="Name" />
                    <ErrorMessage name="name">
                      {(msg) => (
                        <div style={{ color: "red", fontSize: "12px" }}>
                          {msg}
                        </div>
                      )}
                    </ErrorMessage>
                  </InputWrapper>
                  <InputWrapper>
                    <Input name="email" placeholder="youremail@email.com" />
                    <ErrorMessage name="email">
                      {(msg) => (
                        <div
                          style={{
                            color: "red",
                            fontSize: "12px",
                            paddingBottom: "10px",
                          }}
                        >
                          {msg}
                        </div>
                      )}
                    </ErrorMessage>
                  </InputWrapper>
                  <InputWrapper>
                    <Field
                      as={TextArea}
                      name="message"
                      placeholder="Your message"
                    />
                    <ErrorMessage name="message">
                      {(msg) => (
                        <div style={{ color: "red", fontSize: "12px" }}>
                          {msg}
                        </div>
                      )}
                    </ErrorMessage>
                  </InputWrapper>
                  <ReCAPTCHA
                    sitekey="6LcirIUeAAAAALA0CtjyNO0lZLuThKyoP4BYQvAq"
                    onChange={onChange}
                    onExpired={(e) => setIsVerified(false)}
                    ref={reRef}
                  />
                  <Button
                    disabled={!formik.isValid || !formik.dirty || !isVerified}
                    type="submit"
                  >
                    SEND
                  </Button>
                </Form2>
              )}
            </Formik>
          </RightContentWrapper>
        </RightContent>
      </Container>
      <Footer />
      <FooterCopyright />
    </>
  );
};

const Container = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LeftContent = styled.div`
  flex: 1;
  height: 90vh;
  background-color: #101010;
`;

const LeftContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px 50px;
`;

const TitleLeft = styled.h1`
  color: white;
  border-bottom: 1px dashed #7e7e7e;
  padding-bottom: 20px;
`;

const ContentLeft = styled.span`
  margin-top: 20px;
  font-size: 15px;
  color: #f0f0f0;
`;

const RightContent = styled.div`
  flex: 1;
  height: 90vh;
  background-color: white;
`;

const RightContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px 50px;
`;

const TitleRight = styled.h1`
  color: black;
  padding-bottom: 20px;
`;

const Form2 = styled(Form)`
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  margin-bottom: 15px;
`;

const Input = styled(Field)`
  padding: 8px;
  width: 80%;
  background-color: #f0f0f0;
  border: none;
`;

const TextArea = styled.textarea`
  padding: 8px;
  margin-bottom: 15px;
  width: 80%;
  height: 20vh;
  background-color: #f0f0f0;
  border: none;
  resize: none;
`;

const Button = styled.button`
  width: 120px;
  padding: 8px;
  margin-bottom: 10px;
  margin-top: 10px;
  font-size: 11px;
  font-weight: 700;
  border: 1px solid white;
  background-color: black;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    border: 1px solid black;
    background-color: white;
    color: black;
  }
  &:disabled {
    color: white;
    background-color: gray;
    cursor: not-allowed;
  }
`;

export default Contact;
