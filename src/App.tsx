import "App.css";
import { Routes, Route } from "react-router-dom";
import { NotFound404, Tasks, TaskTimer } from "pages";
import { Header } from "components";
import { useTheme } from "context";

function App() {
  const { theme } = useTheme();
  return (
    <div
      className={`App ${theme === "light" ? "default-theme" : "dark-theme"}`}
    >
      <Header />
      <Routes>
        <Route path="/" element={<Tasks />} />
        <Route path="/timer/:id" element={<TaskTimer />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </div>
  );
}

export default App;
