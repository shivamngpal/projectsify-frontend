import { Navigate, Route, Routes } from "react-router-dom";
import ProjectDashboard from "./pages/ProjectDashboard";
import Login from "./pages/Login";
import Signup from "./pages/SignUp.jsx";
import CreateProject from "./pages/CreateProject";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/layout/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/projects/new" element={<CreateProject />} />
        <Route path="/projects/:projectId" element={<ProjectDashboard />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
