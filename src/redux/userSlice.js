import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profile: null,
    status: "unAthenticated"
}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateProfile: (state, action) => {
            state.profile = action.payload
        },
        updateStatus: (state, action) => {
            state.status = action.payload
        },
        resetUser: (state) => {
            state.profile = null
            state.status = "unAthenticated"
        },
    }
})

export const { updateProfile, updateStatus, resetUser } = userSlice.actions;
export default userSlice.reducer;
// export default userReducer;
