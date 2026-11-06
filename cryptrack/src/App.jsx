import { Routes, Route } from "react-router";
import NavBar from "./components/Navbar";
import Market from "./pages/Market";
import CoinDetail from "./pages/CoinDetail";

function App() {
    return (
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Market />} />
          <Route path="/coin/:id" element={<CoinDetail />} />
        </Routes>
      </div>
    );
}

export default App;