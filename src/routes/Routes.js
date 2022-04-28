import IndexAuthor from "../pages/IndexAuthor";
import IndexUser from "../pages/IndexUser"
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import store from "../store/store"
const state = store.getState();

const appRoutes = [
    {
        path: "/",
        element: state.user.userType === "User" ? <IndexUser /> : <IndexAuthor />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/signup",
        element: <Signup />
    }
]
export default appRoutes