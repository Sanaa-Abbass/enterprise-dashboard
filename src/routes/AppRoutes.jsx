import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import MainLayout from "../layouts/MainLayout";
import Tasks from "../pages/Tasks";

function AppRoutes() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default AppRoutes;