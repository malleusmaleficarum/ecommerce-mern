import { publicRequest } from "../requestMethods";
import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import {
  registerFailure,
  registerStart,
  registerSuccess,
} from "./registerRedux";
import {
  getJournalFailure,
  getJournalStart,
  getJournalSuccess,
} from "./journalRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const register = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    dispatch(registerSuccess(res.data));
  } catch (err) {
    dispatch(registerFailure());
  }
};

export const getJournals = async (dispatch) => {
  dispatch(getJournalStart());
  try {
    const res = await publicRequest.get("/journals/");
    dispatch(getJournalSuccess(res.data));
  } catch (err) {
    dispatch(getJournalFailure());
  }
};

export const getSingleJournals = async (id, dispatch) => {
  dispatch(getJournalStart());
  try {
    const res = await publicRequest.get(`/journals/find/${id}`);
    dispatch(getJournalSuccess(res.data));
  } catch (err) {
    dispatch(getJournalFailure());
  }
};
