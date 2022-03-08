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
    //GET JOURNAL
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

    //GET SINGLE JOURNAL
    getSingleJournalStart: (state) => {
      state.isFetching = true;
      state.error = false;
      state.isSuccess = null;
    },
    getSingleJournalSuccess: (state, action) => {
      state.isFetching = false;
      state.journals = action.payload;
      state.error = false;
      state.isSuccess = true;
    },
    getSingleJournalFailure: (state) => {
      state.isFetching = false;
      state.error = true;
      state.isSuccess = false;
    },
  },
});

export const {
  getJournalStart,
  getJournalSuccess,
  getJournalFailure,
  getSingleJournalStart,
  getSingleJournalSuccess,
  getSingleJournalFailure,
} = journalSlice.actions;
export default journalSlice.reducer;
