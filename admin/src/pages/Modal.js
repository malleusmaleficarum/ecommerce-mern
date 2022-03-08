import styled from "styled-components";
import { useDispatch } from "react-redux";
import { deleteJournal } from "../redux/apiCalls";

import { userRequest } from "../requestMethods";

const Modal = ({ show, onClose, idJour, titleJour, deleteData, spinner }) => {
  const dispatch = useDispatch();

  // const handleDelete = (id) => {
  //   deleteJournal(id, dispatch);
  // };

  if (!show) return null;

  return (
    <>
      <ModalContainer onClick={onClose}>
        <ModalWrapper onClick={(e) => e.stopPropagation()}>
          <ModalTitle>Delete Journal</ModalTitle>
          <ModalBody>
            Are you sure want to delete <b>{titleJour}</b> ?
            <br />
            <i>-Once you delete your data, the data cannot be restored-</i>
          </ModalBody>
          <ModalFooter>
            <ModalButton onClick={() => deleteData(idJour)}>
              {!spinner ? "Delete" : "Loading.."}
            </ModalButton>
            <ModalButtonCancel onClick={onClose}>Cancel</ModalButtonCancel>
          </ModalFooter>
        </ModalWrapper>
      </ModalContainer>
    </>
  );
};

const ModalContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 30%;
  width: 500px;
  background-color: white;
`;

const ModalTitle = styled.h1`
  padding: 10px;
  border-bottom: 1px solid #eee;
`;

const ModalBody = styled.span`
  margin: 20px 0;
  padding: 10px;
`;

const ModalFooter = styled.div`
  padding: 10px;
  border-top: 1px solid #eee;
`;

const ModalButton = styled.button`
  padding: 10px;
  background-color: #fa8072;
  font-weight: 600;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: red;
  }
`;

const ModalButtonCancel = styled.button`
  padding: 10px;
  margin-left: 10px;
  background-color: lightgray;
  font-weight: 600;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

export default Modal;
