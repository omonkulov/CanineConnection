import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LogIn from "../components/Login";
import Home from "../components/Home";
import Error from "../components/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error/>
  },
  {
    path: "/login",
    element: <LogIn />,
  },
  {
    path: "/home",
    element: <Home />,
  },
]);


export { router };
