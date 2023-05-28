import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInitActionPayload, IResume } from "../../interfaces/resume.interface";
import { InitialResume } from "../../states/initials.state";
import {
  DeleteResume,
  DuplicateResume,
  ReadAllResumes,
  ReadAllUserResumes,
  RecordResume,
  UpdateResume,
} from "../reducers/resume.reducer";

interface IState {
  currentStep: number;
  currentResume: IResume;
  resumes: IResume[];
  isLoading: boolean;
  error: null | string;
}

const initialState: IState = {
  currentStep: 0,
  currentResume: InitialResume,
  resumes: [],
  isLoading: false,
  error: null,
};

const ResumeSlice = createSlice({
  name: "resume-builder-slice",
  initialState,
  reducers: {
    updateResume(state, action: PayloadAction<IResume>) {
      state.currentResume = action.payload;
    },
    __INIT__(state, action: PayloadAction<IInitActionPayload>) {
      // const [name, surname] = action.payload.full_name.split(" ");
      // state.currentResume.personalData.name = name;
      // state.currentResume.personalData.surname = surname;
      // state.currentResume.personalData.email = action.payload.email;
      state.currentResume = InitialResume;
    },
    updateStep(state, action: PayloadAction<"next" | "prev">) {
      let value = action.payload === "next" ? 1 : -1;
      state.currentStep += value;
    },
    setStep(state, action: PayloadAction<number>) {
      state.currentStep = action.payload;
    },
    changeResume(state, action: PayloadAction<string>) {
      state.currentResume =
        state.resumes[
          state.resumes.findIndex((resume) => resume._id === action.payload)
        ];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(RecordResume.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(RecordResume.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(RecordResume.rejected, (state) => {
        state.isLoading = false;
        state.error =
          "We couldn't create Resume! Please try again or check all important fields";
      })
      .addCase(ReadAllResumes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(ReadAllResumes.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.resumes = action.payload.result;
        state.isLoading = false;
      })
      .addCase(ReadAllResumes.rejected, (state) => {
        state.isLoading = false;
        state.error = "Server error!";
      })
      .addCase(ReadAllUserResumes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(ReadAllUserResumes.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.resumes = action.payload.result;
        state.isLoading = false;
      })
      .addCase(ReadAllUserResumes.rejected, (state) => {
        state.isLoading = false;
        state.error = "Server error!";
      })
      .addCase(DeleteResume.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(DeleteResume.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.resumes = state.resumes.filter(
          (resume) => resume._id !== action.payload
        );
      })
      .addCase(DeleteResume.rejected, (state) => {
        state.isLoading = false;
        state.error = "Delete error!";
      })
      .addCase(UpdateResume.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(UpdateResume.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(UpdateResume.rejected, (state) => {
        state.isLoading = false;
        state.error = "Delete error!";
      })
      .addCase(DuplicateResume.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(DuplicateResume.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.resumes.push(action.payload);
      })
      .addCase(DuplicateResume.rejected, (state) => {
        state.isLoading = false;
        state.error = "Delete error!";
      });
  },
});

export const { updateResume, updateStep, __INIT__, setStep, changeResume } =
  ResumeSlice.actions;

export default ResumeSlice.reducer;
