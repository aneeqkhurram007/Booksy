import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    userType: "User",
    userAuth: null
}
const userSlice = createSlice({
    name: "User Reducer",
    initialState,
    reducers: {
        setUserType: (state, action) => {
            state.userType = action.payload.type
        },
        setUserAuth: (state, action) => {
            state.userAuth = action.payload.userAuth
        }
    }
})
export const { setUserType, setUserAuth } = userSlice.actions
export default userSlice.reducer