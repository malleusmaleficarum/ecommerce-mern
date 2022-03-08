import draftToHtml from "draftjs-to-html";
import spinner from "../assets/spinner.svg";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { WithContext as ReactTags } from "react-tag-input";
import { Formik } from "formik";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import "../components/tagInput.css";
import { useDispatch } from "react-redux";
import { editJournal } from "../redux/apiCalls";
import { publicRequest } from "../requestMethods";

//dangerouslySetInnerHTML ={{__html: draftToHtml(JSON.parse(journal.desc))}}

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const Journal = () => {
  const location = useLocation();
  let journalId = location.pathname.split("/")[2];
  const [journal, setJournal] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    const getJournal = async () => {
      try {
        const res = await publicRequest.get(`journals/find/${journalId}`);
        setJournal(res.data);
        setEditorState(
          EditorState.createWithContent(
            convertFromRaw(JSON.parse(res.data.desc))
          )
        );

        setTags([
          ...res.data.categories.map((item) => {
            return { id: item, text: item };
          }),
        ]);
      } catch (err) {
        console.log(err);
      }
    };
    getJournal();
  }, [journalId]);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const handleDeleteTags = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAdditionTags = (tag) => {
    setTags([...tags, tag]);
    console.log(tags);
  };

  const handleClickSubmit = (values, { resetForm }) => {
    setLoading(true);
    const fileName = new Date().getTime() + values.image.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, values.image);

    const categories = [];
    tags.forEach((i) => categories.push(i.text));
    const content = JSON.stringify(
      convertToRaw(editorState.getCurrentContent())
    );

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const journal = {
            title: values.title,
            image: downloadURL,
            categories: categories,
            desc: content,
          };

          editJournal(journalId, journal, dispatch);
          console.log(journal);
          setLoading(false);
        });
      }
    );
  };

  return (
    <Container>
      <Title>Edit Journal</Title>
      {!journal ? (
        "Loading..."
      ) : (
        <Formik
          enableReinitialize={true}
          initialValues={{
            title: journal.title || "",
            image: "",
            categories: "",
            desc: "",
          }}
          validate={(values) => {
            let errors = {};

            if (!values.title) {
              errors.title = "Title is required";
            } else if (values.title.length < 11) {
              errors.title = "Too short";
            }

            if (!values.image) {
              errors.image = "Image is required";
            }
            if (tags.length === 0) {
              errors.categories = "Input category";
            }
            if (editorState.getCurrentContent().getPlainText().trim() === "") {
              errors.desc = "Description is required";
            } else if (
              editorState.getCurrentContent().getPlainText().trim().length < 10
            ) {
              errors.desc = "Too Short";
            }
            return errors;
          }}
          onSubmit={handleClickSubmit}
        >
          {({
            touched,
            values,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Input
                name="title"
                placeholder="Title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
              />
              {touched.title && errors.title && (
                <TextValidation>{errors.title}</TextValidation>
              )}
              <Label>
                <InputFile
                  name="image"
                  placeholder="Image"
                  type="file"
                  onChange={(e) => setFieldValue("image", e.target.files[0])}
                  onBlur={handleBlur}
                />
                + Choose image to upload
              </Label>
              {values.image && (
                <FileImage
                  src={URL.createObjectURL(values.image)}
                  alt="Attachment"
                />
              )}
              {touched.image && errors.image && (
                <TextValidation>{errors.image}</TextValidation>
              )}
              <ReactTags
                tags={tags}
                handleDelete={handleDeleteTags}
                handleAddition={handleAdditionTags}
                placeholder="Categories"
                name="categories"
                delimiters={delimiters}
                autocomplete
                allowDragDrop={false}
                autofocus={false}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.categories}
              />
              {touched.categories && errors.categories && (
                <TextValidation>{errors.categories}</TextValidation>
              )}
              <Editor
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
                editorStyle={{
                  border: "1px solid lightgray",
                  maxWidth: "815px",
                  minHeight: "300px",
                  maxHeight: "400px",
                  marginBottom: "10px",
                }}
                toolbarStyle={{ maxWidth: "800px" }}
                value={values.desc}
              />
              {touched.desc && errors.desc && (
                <TextValidation>{errors.desc}</TextValidation>
              )}
              <Button type="submit" disabled={loading}>
                {loading ? <img src={spinner} alt="spinner" /> : "Submit"}
              </Button>
            </Form>
          )}
        </Formik>
      )}
      <ToastContainer />
    </Container>
  );
};

const Container = styled.div`
  flex: 4;
  margin-bottom: 50px;
`;

const Title = styled.h1`
  margin-bottom: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 90%;
`;

const TextValidation = styled.label`
  margin-bottom: 0.5em;
  font-size: 13px;
  color: red;
`;

const Input = styled.input`
  padding: 5px;
  max-width: 800px;
  margin-bottom: 10px;
  border: 1px solid lightgray;
`;

const Label = styled.label`
  max-width: 300px;
  padding: 5px;
  border: 1px solid lightgray;
  display: inline-block;
  cursor: pointer;
  margin-bottom: 10px;
  color: grey;
  font-size: 14px;
`;

const InputFile = styled(Input)`
  display: none;
`;

const FileImage = styled.img`
  max-width: 100px;
  max-height: 100px;
  object-fit: cover;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px;
  max-width: 150px;
  font-weight: 800;
  background-color: white;
  border: 1px solid blue;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }

  &:disabled {
    background-color: white;
    cursor: default;
  }
`;

export default Journal;
