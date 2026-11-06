import { Routes, Route } from "react-router";
import NavBar from "./components/Navbar";
import Market from "./pages/Market";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Market />} />
      </Routes>
    </div>
  );
}

export default App;