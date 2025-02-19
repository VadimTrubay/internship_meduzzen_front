import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {deleteQuiz, fetchQuizzes, addQuiz, fetchQuizById, updateQuiz, sendExelFile} from "./operations";
import {initialQuizzesType} from "../../types/quizzesTypes";
import toast from "react-hot-toast";


const initialQuizzes: initialQuizzesType = {
  items: {
    quizzes: [],
    total_count: 0,
  },
  quizById: null,
  loading: false,
  error: null,
};

const handlePending = (state: initialQuizzesType) => {
  state.loading = true;
};

const handleRejected = (state: initialQuizzesType, action: PayloadAction<any>) => {
  state.loading = false;
  state.error = action.payload;
  toast.error(action.payload);
};

const handleFetchQuizzesFulfilled = (state: initialQuizzesType, action: PayloadAction<any>) => {
  state.loading = false;
  state.error = null;
  state.items = action.payload;
};

const handleGetQuizByIdFulfilled = (state: initialQuizzesType, action: PayloadAction<any>) => {
  state.loading = false;
  state.error = null;
  state.quizById = action.payload;
};

const handleAddQuizFulfilled = (state: initialQuizzesType, action: PayloadAction<any>) => {
  state.loading = false;
  state.error = null;
  state.items.quizzes.push(action.payload);
  toast.success(`Quiz added successfully`);
};

const handleUpdateQuizFulfilled = (state: initialQuizzesType, action: PayloadAction<any>) => {
  state.loading = false;
  state.error = null;
  const index = state.items.quizzes.findIndex((quiz) => quiz.id === action.payload.id);
  if (index !== -1) {
    state.items.quizzes[index] = {...state.items.quizzes[index], ...action.payload};
  }
  toast.success(`Quiz updated successfully`);
};

const handleDeleteQuizFulfilled = (state: initialQuizzesType, action: PayloadAction<any>) => {
  state.loading = false;
  state.error = null;
  state.items.quizzes = state.items.quizzes.filter((quiz) => quiz.id !== action.payload.id);
  state.quizById = null;
  toast.success(`Quiz deleted successfully`);
};

const handleSendExelFile = (state: initialQuizzesType) => {
  state.loading = false;
  state.error = null;
  toast.success(`Exel File imported successfully`);
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState: initialQuizzes,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchQuizzes.pending, handlePending)
      .addCase(fetchQuizzes.fulfilled, handleFetchQuizzesFulfilled)
      .addCase(fetchQuizzes.rejected, handleRejected)
      .addCase(fetchQuizById.pending, handlePending)
      .addCase(fetchQuizById.fulfilled, handleGetQuizByIdFulfilled)
      .addCase(fetchQuizById.rejected, handleRejected)
      .addCase(addQuiz.pending, handlePending)
      .addCase(addQuiz.fulfilled, handleAddQuizFulfilled)
      .addCase(addQuiz.rejected, handleRejected)
      .addCase(updateQuiz.pending, handlePending)
      .addCase(updateQuiz.fulfilled, handleUpdateQuizFulfilled)
      .addCase(updateQuiz.rejected, handleRejected)
      .addCase(deleteQuiz.pending, handlePending)
      .addCase(deleteQuiz.fulfilled, handleDeleteQuizFulfilled)
      .addCase(deleteQuiz.rejected, handleRejected)
      .addCase(sendExelFile.pending, handlePending)
      .addCase(sendExelFile.fulfilled, handleSendExelFile)
      .addCase(sendExelFile.rejected, handleRejected),
});

export const quizzesReducer = quizzesSlice.reducer;
