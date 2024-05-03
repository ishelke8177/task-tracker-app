import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components";
import { HomePage, AddTaskPage } from "./Pages";

function App() {
  return (
    <>
      <Navbar />
      <div className="w-full flex justify-center bg-white">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/addtask" element={<AddTaskPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
