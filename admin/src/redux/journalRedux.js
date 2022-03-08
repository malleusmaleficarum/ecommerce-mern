import { createSlice } from "@reduxjs/toolkit";

const journalSlice = createSlice({
  name: "journal",
  initialState: {
    journals: [],
    isFetching: false,
    error: false,
    isSuccess: null,
  },
  reducers: {
    //ADD
    addJournalStart: (state) => {
      state.isFetching = true;
      state.error = false;
      state.isSuccess = null;
    },
    addJournalSuccess: (state, action) => {
      state.isFetching = false;
      state.journals = action.payload;
      state.isSuccess = true;
      state.error = false;
    },
    addJournalFailure: (state) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.error = true;
    },

    //UPDATE
    editJournalStart: (state) => {
      state.isFetching = true;
      state.error = false;
      state.isSuccess = null;
    },
    editJournalSuccess: (state, action) => {
      state.isFetching = false;
      state.journals[
        state.journals.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.journal;
      state.isSuccess = true;
      state.error = false;
    },
    editJournalFailure: (state) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.error = true;
    },

    //GET SINGLE JOURNAL
    getJournalStart: (state) => {
      state.isFetching = true;
      state.error = false;
      state.isSuccess = null;
    },
    getJournalSuccess: (state, action) => {
      state.isFetching = false;
      state.journals = action.payload;
      state.error = false;
      state.isSuccess = true;
    },
    getJournalFailure: (state) => {
      state.isFetching = false;
      state.error = true;
      state.isSuccess = false;
    },

    //DELETE SINGLE JOURNAL
    deleteJournalStart: (state) => {
      state.isFetching = true;
      state.error = false;
      state.isSuccess = null;
    },
    deleteJournalSuccess: (state, action) => {
      state.isFetching = false;
      state.journals.splice(
        state.journals.findIndex((item) => item._id === action.payload), //only in redux toolkit
        1
      );
      state.error = false;
      state.isSuccess = true;
    },
    deleteJournalFailure: (state) => {
      state.isFetching = false;
      state.error = true;
      state.isSuccess = false;
    },
  },
});

export const {
  addJournalStart,
  addJournalSuccess,
  addJournalFailure,
  editJournalStart,
  editJournalSuccess,
  editJournalFailure,
  getJournalStart,
  getJournalSuccess,
  getJournalFailure,
  deleteJournalStart,
  deleteJournalSuccess,
  deleteJournalFailure,
} = journalSlice.actions;
export default journalSlice.reducer;
