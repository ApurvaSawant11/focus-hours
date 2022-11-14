import "App.css";
import { Routes, Route } from "react-router-dom";
import { NotFound404, Tasks, TaskTimer } from "pages";
import { Header } from "components";

function App() {
  return (
    <div className="App">
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
