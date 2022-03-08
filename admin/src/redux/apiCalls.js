import { publicRequest, userRequest } from "../requestMethods";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure,
} from "./productRedux";
import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import {
  addJournalStart,
  addJournalSuccess,
  addJournalFailure,
  editJournalStart,
  editJournalSuccess,
  editJournalFailure,
  getJournalStart,
  getJournalFailure,
  getJournalSuccess,
  deleteJournalStart,
  deleteJournalSuccess,
  deleteJournalFailure,
} from "./journalRedux";
import { toast } from "react-toastify";

const notifSuccess = () =>
  toast.success("Process Success", {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

const notifFailure = () =>
  toast.error("Something went wrong", {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    //const res = await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    //const res = await userRequest.put(`/products/${id}`);
    dispatch(updateProductSuccess({ id: id, product: product }));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};

export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/products/`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};

export const addJournal = async (journal, dispatch) => {
  dispatch(addJournalStart());
  try {
    const res = await userRequest.post("/journals/", journal);
    dispatch(addJournalSuccess(res.data));
    notifSuccess();
  } catch (err) {
    dispatch(addJournalFailure());
    notifFailure();
  }
};

export const editJournal = async (id, journal, dispatch) => {
  dispatch(editJournalStart());
  try {
    const res = await userRequest.put(`/journals/${id}`, journal);
    dispatch(editJournalSuccess(res.data));
    notifSuccess();
  } catch (err) {
    dispatch(editJournalFailure());
    notifFailure();
  }
};

//get single journal
export const getJournal = async (id, dispatch) => {
  dispatch(getJournalStart());
  try {
    const res = await publicRequest.get(`/journals/find/${id}`);
    dispatch(getJournalSuccess(res.data));
    notifSuccess();
  } catch (err) {
    dispatch(getJournalFailure());
  }
};

//delete journal
export const deleteJournal = async (id, dispatch) => {
  dispatch(deleteJournalStart());
  try {
    const res = await userRequest.delete(`/journals/${id}`);
    dispatch(deleteJournalSuccess(res.data));
    notifSuccess();
  } catch (err) {
    dispatch(deleteJournalFailure());
    notifFailure();
  }
};
