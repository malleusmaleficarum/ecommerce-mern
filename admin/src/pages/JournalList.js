import styled from "styled-components";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import { DeleteOutline } from "@material-ui/icons";
import { useEffect, useRef, useState } from "react";
import { publicRequest } from "../requestMethods";
import { useDispatch } from "react-redux";
import Modal from "./Modal";
import { deleteJournal } from "../redux/apiCalls";
import { ToastContainer } from "react-toastify";
//import spinner from "../assets/spinner.svg";

const JournalList = () => {
  const [journals, setJournals] = useState([]);
  const [show, setShow] = useState(false);
  const [spinner, setSpiner] = useState(false);
  const dispatch = useDispatch();
  const [idJour, setIdJour] = useState("");
  const [titleJour, setTitleJour] = useState("");
  const timerRef = useRef(null);
  const [toggle, setToggle] = useState(false);
  //const [isLoading, setIsLoading] = useState(false);

  const handleDelete = (id) => {
    setSpiner(true);
    deleteJournal(id, dispatch);
    setToggle(!toggle);
    setSpiner(false);
    setShow(false);
  };

  useEffect(() => {
    const getJournals = async () => {
      try {
        const res = await publicRequest.get("journals/");
        setJournals(res.data);
      } catch (error) {}
    };
    getJournals();
    console.log(toggle);
  }, [toggle]);

  const columns = [
    { field: "_id", headerName: "ID", width: 160 },
    { field: "title", headerName: "Title", width: 300 },
    { field: "categories", headerName: "Categories", width: 200 },
    { field: "desc", headerName: "Description", width: 200 },
    {
      field: "createdAt",
      headerName: "Created Date",
      type: "date",
      width: 130,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/journal/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <button
              onClick={() => {
                setShow(true);
                setIdJour(params.row._id);
                setTitleJour(params.row.title.substring(0, 20));
              }}
              style={{
                cursor: "pointer",
                backgroundColor: "transparent",
                border: "1px solid #eee",
              }}
            >
              <DeleteOutline className="userListDelete" />
            </button>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Container>
        <Link to="/newJournal">
          <Button>+ Add New Post</Button>
        </Link>
        {journals.length < 1 ? (
          "No Data"
        ) : (
          // : isLoading ? (
          //   <img src={spinner} alt="spinner" />)
          <DataGrid
            columns={columns}
            rows={journals}
            getRowId={(row) => row._id}
            pageSize={8}
            disableSelectionOnClick
            checkboxSelection
          />
        )}
      </Container>
      <Modal
        show={show}
        onClose={() => setShow(false)}
        idJour={idJour}
        titleJour={titleJour}
        deleteData={handleDelete}
        spinner={spinner}
      />
      <ToastContainer />
    </>
  );
};

const Container = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  padding: 10px;
  margin-bottom: 10px;
  background-color: white;
  border: 1px solid blue;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export default JournalList;
