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
import Graphs from "./pages/Graphs";
import Storage from "./pages/Storage";
import Management from "./pages/Management";
import Alerts from "./pages/Alerts";
import ContactUs from "./pages/ContactUs";

const App = () => {
  return (
    <ThemeProvider theme={ThemeConfig}>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/graphs" element={<Graphs />} />
            <Route path="/storage" element={<Storage />} />
            <Route path="/management" element={<Management />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/contactus" element={<ContactUs />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
