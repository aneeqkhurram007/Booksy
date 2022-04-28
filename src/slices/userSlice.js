import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    userType: null
}
const userSlice = createSlice({
    name: "User Reducer",
    initialState,
    reducers: {
        createUser: (state, action) => {

        }
    }
})
export const { createUser } = userSlice.actions
export default userSlice.reducer