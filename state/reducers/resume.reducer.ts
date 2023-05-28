import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  IRecordResumeRequest,
  IResume,
  RequestData,
} from "../../interfaces/resume.interface";
import { SERVER_BASE_URL } from "../../consts/request_data";
import { ConstructDataForRecordResume } from "../../utils/construct";

export const RecordResume = createAsyncThunk(
  "/resume/record",
  async (
    payload: { resume: IResume; title: string; owner: string },
    { rejectWithValue }
  ) => {
    const requestData: RequestData = ConstructDataForRecordResume(payload);
    try {
      const response = await fetch(`${SERVER_BASE_URL}/resume`, {
        method: "POST",
        body: JSON.stringify(requestData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw Error("Incorrect credentials!");
      }
      const data = await response.json();
      return data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }

      return rejectWithValue(err.response.data);
    }
  }
);

export const ReadAllResumes = createAsyncThunk(
  "/resume/get/all",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${SERVER_BASE_URL}/resume`);
      if (!response.ok) {
        throw Error("Request was failed");
      }
      const result = await response.json();
      return result;
    } catch (err: any) {
      if (!err.message) {
        throw err;
      }

      return rejectWithValue(err.response.data);
    }
  }
);

export const ReadAllUserResumes = createAsyncThunk(
  "/resume/get/user_all",
  async (payload: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${SERVER_BASE_URL}/resume?user_id=${payload}`
      );
      if (!response.ok) {
        rejectWithValue("Failed!");
      }
      return await response.json();
    } catch (e: any) {
      if (!e.message) {
        throw e;
      }

      return rejectWithValue(e.response.data);
    }
  }
);

export const DeleteResume = createAsyncThunk(
  "/resume/delete",
  async (
    payload: { userId: string; resumeId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `${SERVER_BASE_URL}/resume?user_id=${payload.userId}&resume_id=${payload.resumeId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        rejectWithValue("Failed!");
      }

      return payload.resumeId;
    } catch (e: any) {
      if (!e.message) {
        throw e;
      }

      return rejectWithValue(e.respone.data);
    }
  }
);

export const UpdateResume = createAsyncThunk(
  "/resume/update",
  async (
    payload: { resumeId: string; newData: IRecordResumeRequest },
    { rejectWithValue }
  ) => {
    const rawResume = ConstructDataForRecordResume(payload.newData);
    try {
      const response = await fetch(`${SERVER_BASE_URL}/resume`, {
        method: "PATCH",
        body: JSON.stringify({
          resumeId: payload.resumeId,
          newData: rawResume,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        rejectWithValue("Failed!");
      }

      return "Updated";
    } catch (e: any) {
      if (!e.message) {
        throw e;
      }

      return rejectWithValue(e.respone.data);
    }
  }
);

export const DuplicateResume = createAsyncThunk(
  "/resume/duplicate",
  async (
    payload: { userId: string; resume: IRecordResumeRequest },
    { rejectWithValue }
  ) => {
    const rawResume = ConstructDataForRecordResume(payload.resume);
    try {
      const response = await fetch(`${SERVER_BASE_URL}/resume`, {
        method: "PUT",
        body: JSON.stringify({
          userId: payload.userId,
          resume: rawResume,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        rejectWithValue("Failed!");
      }

      return (await response.json()).result;
    } catch (e: any) {
      if (!e.message) {
        throw e;
      }

      return rejectWithValue(e.respone.data);
    }
  }
);
