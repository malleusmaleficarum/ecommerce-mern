import styled from "styled-components";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useState } from "react";
import { WithContext as ReactTags } from "react-tag-input";
import { Formik } from "formik";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import "../components/tagInput.css";
import { useDispatch } from "react-redux";
import { addJournal } from "../redux/apiCalls";

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const NewJournal = () => {
  const [title, setTitle] = useState();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [tags, setTags] = useState([]);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const handleDeleteTags = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAdditionTags = (tag) => {
    setTags([...tags, tag]);
  };

  const handleClickSubmit = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    const categories = [];
    tags.forEach((i) => categories.push(i.text));
    const content = JSON.stringify(
      convertToRaw(editorState.getCurrentContent()).blocks
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
            title: title,
            image: downloadURL,
            categories: categories,
            desc: content,
          };
          addJournal(journal, dispatch);
        });
      }
    );
  };

  return (
    <Container>
      <Title>Add New Journal</Title>
      <Formik
        initialValues={{ title: "", image: "", categories: "" }}
        validate={(values) => {
          let errors = {};

          if (!values.title) {
            errors.title = "Title is required";
          }

          if (!values.image) {
            errors.image = "Image is required";
          }
          if (tags.length === 0) {
            errors.categories = "Input category";
          }
          return errors;
        }}
        onSubmit={(values) => console.log(values, tags.length)}
      >
        {({
          touched,
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          setValues,
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
                marginBottom: "10px",
              }}
              toolbarStyle={{ maxWidth: "800px" }}
            />
            <Button type="submit">Submit</Button>
          </Form>
        )}
      </Formik>
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
  margin: 0.5em 0l;
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
`;

export default NewJournal;
