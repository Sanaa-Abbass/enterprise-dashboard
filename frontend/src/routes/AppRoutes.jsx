import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Tasks from "../pages/Tasks";

import ProtectedRoute from "../components/ProtectedRoute";
import Register from "../pages/Register";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <Tasks />
          </ProtectedRoute>
        }
      />

      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default AppRoutes;