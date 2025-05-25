import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import storage from "@/app/(onboarding)/storage";

interface AuthState {
  isLoading: boolean;
  token: string | null;
  user: any;
}

// Declare initialState only once
const initialState: AuthState = {
  token: null,
  user: null,
  isLoading: false,
};

// ✅ Load user from Secure Storage
export const loadUserFromStorage = createAsyncThunk(
  "user/loadUserFromStorage",
  async () => {
    const token = await storage.getToken();
    const user = await storage.getUser();
    return { token, user };
  }
);

// ✅ Logout Thunk to also clear storage
export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  await storage.removeToken();
});

const userSlice = createSlice({
  name: "user",
  initialState,  // Use the already defined initialState here
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUserFromStorage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadUserFromStorage.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isLoading = false;
      })
      .addCase(loadUserFromStorage.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null;
        state.user = null;
        state.isLoading = false;
      });
  },
});

export const { loginSuccess } = userSlice.actions;
export default userSlice.reducer;
