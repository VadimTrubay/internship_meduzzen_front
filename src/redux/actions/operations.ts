import {createAsyncThunk} from "@reduxjs/toolkit";
import {getMembers} from "../../api/api_actions";


export const fetchMembers = createAsyncThunk(
  "companies/fetchMembers",
  async (companyId: string, thunkAPI) => {
    try {
      const response = await getMembers(companyId, thunkAPI)
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const fetchCompanyById = createAsyncThunk(
//   "companies/getCompanyById",
//   async (id: string, thunkAPI) => {
//     try {
//       const response = await getCompanyById(id, thunkAPI);
//       return response.data;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );
//
// export const updateCompany = createAsyncThunk(
//   "companies/updateCompany",
//   async (companyData: CompanyUpdateType, thunkAPI) => {
//     try {
//       const response = await editCompany(companyData, thunkAPI)
//       return response.data;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );
//
// export const deleteCompanyById = createAsyncThunk(
//   "companies/deleteCompany",
//   async (id: string, thunkAPI) => {
//     try {
//       const response = await removeCompany(id, thunkAPI);
//       return response.data;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );
