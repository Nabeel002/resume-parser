import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  user: null,
  status: 'idle',
};
const authSlice = createSlice({
  name: "auth",
  initialState,
    reducers: { 
        setCredentials: (state, action) => {
            state.user = action.payload.user;
            state.status = 'authenticated';
        },
        clearCredentials: (state) => {
            state.user = null;
            state.status = 'unauthenticated';
        },
    }}
)

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;