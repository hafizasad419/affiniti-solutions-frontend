import { createSlice } from "@reduxjs/toolkit";
import { USER_ROLES } from "@/constants";

interface AuthData {
    isAuthenticated: boolean,
    token: string,
    role: string | null
}

const initialState: AuthData = {
    isAuthenticated: false,
    token: "",
    role: null
}

const authSlice = createSlice(
    {
        name: "auth",
        initialState,
        reducers: {
            setIsAuthenticated: (state, action) => {
                state.isAuthenticated = action.payload;
            },
            setAuthData: (state, action) => {
                state.token = action.payload.token;
                state.role = action.payload.role;
            },
            logout: (state) => {
                state.isAuthenticated = false;
                state.token = "";
                state.role = null;
            },
        },
    }
)

export const { setIsAuthenticated, setAuthData, logout } = authSlice.actions;
export default authSlice.reducer;