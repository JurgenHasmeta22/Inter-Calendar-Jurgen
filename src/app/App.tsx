import AppNavigate from "./AppNavigate";
import PrivateRoute from "./private-route";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/login/LoginPage";
import RegisterPage from "../pages/register/RegisterPage";
import ErrorPage from "../pages/error/ErrorPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import UserProfilePage from "../pages/user/UserProfilePage";
import "../app/App.css";

const App = () => {
  return (
    <BrowserRouter>
      <AppNavigate />
      <Routes>
        <Route index element={<Navigate replace to="/login" />} />
        <Route path="*" element={<ErrorPage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/:username"
          element={
            <PrivateRoute>
              <UserProfilePage />
            </PrivateRoute>
          }
        />
        <Route path="/profile/:username/:tab" element={<UserProfilePage />} />
        <Route
          path="/login"
          element={
            <PrivateRoute isPageLogin>
              <LoginPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PrivateRoute isPageLogin>
              <RegisterPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
