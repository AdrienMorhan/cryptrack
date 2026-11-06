import { Routes, Route } from "react-router";
import { Container } from "react-bootstrap";
import NavBar from "./components/Navbar";
import Market from "./pages/Market";
import CoinDetail from "./pages/CoinDetail";

function App() {
    return (
        <div>
            <NavBar />
            <Container className="py-4">
                <Routes>
                    <Route path="/" element={<Market />} />
                    <Route path="/coin/:id" element={<CoinDetail />} />
                </Routes>
            </Container>
        </div>
    );
}

export default App;