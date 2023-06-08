import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LogIn from "../components/Login";
import Home from "../components/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
