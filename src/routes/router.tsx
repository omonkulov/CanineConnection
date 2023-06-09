import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LogIn from "../components/Login";
import Home from "../components/Home/Home";
import Error from "../components/Error";
import MyMatches from "../components/Matches/MyMatches";

/**
 * Setting up routes
 */
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
  {
    path: "/matches",
    element: <MyMatches />,
  },
]);


export { router };
