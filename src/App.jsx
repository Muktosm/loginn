import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Login from "./components/login/Login";
import { Singup } from "./components/sing up/Singup";
import ResetPassword from "./components/resetPassword/ResetPassword";
import app from "./firebase.config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./components/homePage/HomePage";

function App() {
  const myRoute = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<HomePage />} />
        <Route path="/logIn" element={<Login />} />
        <Route path="/singup" element={<Singup />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={myRoute} />
      <ToastContainer />
    </>
  );
}

export default App;
