import appRoutes from "./routes/Routes";
import { useRoutes } from "react-router-dom"
function App() {
  const routes = useRoutes(appRoutes)
  return (
    <div>
      {routes}
    </div>
  );
}

export default App;
