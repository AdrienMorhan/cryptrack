import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import { Container } from "react-bootstrap";
import NavBar from "./components/Navbar";
import Market from "./pages/Market";
import CoinDetail from "./pages/CoinDetail";

function App() {
    const [favorites, setFavorites] = useState([]);
    const toggleFavorite = (id) => {
        if (favorites.includes(id)) {
            setFavorites(favorites.filter((fav) => fav !== id));
        } else {
            setFavorites([...favorites, id]);
        }
    };
    return (
        <div>
            <NavBar />
            <Container className="py-4">
                <Routes>
                    <Route path="/" element={<Market />} />
                    <Route path="/coin/:id" element={
                        <CoinDetail
                            favorites={favorites}
                            onToggleFavorite={toggleFavorite}
                        />
                        }
                    />
                </Routes>
            </Container>
        </div>
    );
}

export default App;