import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./Components/Auth/LoginForm";
import SignupForm from "./Components/Auth/SignupForm";
import AdminPage from "./Pages/AdminPages/AdminPage";
import PrivateRoute from "./utils/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./Pages/Home/HomePage";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute role="admin">
                <AdminPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
