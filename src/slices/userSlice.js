import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    userType: "User"
}
const userSlice = createSlice({
    name: "User Reducer",
    initialState,
    reducers: {
        setUserType: (state, action) => {
            state.userType = action.payload.type
        }
    }
})
export const { setUserType } = userSlice.actions
export default userSlice.reducer