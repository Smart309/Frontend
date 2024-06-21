import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { ThemeConfig } from "./config/ThemeConfig";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <ThemeProvider theme={ThemeConfig}>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
