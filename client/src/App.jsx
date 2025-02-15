import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import RoomId from "./components/RoomId";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/roomId" element={<RoomId />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
