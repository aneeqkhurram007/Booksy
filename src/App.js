import appRoutes from "./routes/Routes";
import { useRoutes } from "react-router-dom"
import { useEffect } from "react";
import { auth } from "./firebase"
import { onAuthStateChanged } from "firebase/auth"
import { useNavigate, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
function App() {
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login", { replace: true })
      }
    })
    return unsubscribe
  }, [])

  const routes = useRoutes(appRoutes)
  return (
    <div className="min-h-screen w-full flex flex-col justify-between">
      <Navbar />
      {routes}
      <Footer />
    </div>
  );
}

export default App;
