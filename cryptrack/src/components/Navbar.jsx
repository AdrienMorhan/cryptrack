import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Nav } from "react-bootstrap";

function NavBar() {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
        const getData = async () => {
            try {
            const res = await fetch(
                `https://api.coingecko.com/api/v3/search?query=${query}`
            );
            if (!res.ok) {
                throw new Error(`HTTP error: ${res.status}`);
            }
            const data = await res.json();
            setSuggestions(
                data.coins
                .filter((coin) => coin.market_cap_rank !== null)
                .sort((a, b) => a.market_cap_rank - b.market_cap_rank)
                .slice(0, 3)
            );
            } catch (err) {
            console.log(err.message);
            }
        };
        if (query.length > 4) { // only suggestion after 5 similar letters because otherwise there are too many requests
            getData();
        } else {
            setSuggestions([]);
        }
        }, 1500);
        return () => clearTimeout(timer);
    }, [query]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (suggestions.length > 0) {
        navigate(`/coin/${suggestions[0].id}`);
        setQuery("");
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "space-between", padding: 10 }}>
        <Nav.Link as={Link} to="/">Cryptrack</Nav.Link>
        <div style={{ display: "flex" }}>
            <Nav>
            <Nav.Link as={Link} to="/">Market</Nav.Link>
            <Nav.Link as={Link} to="/favorites">Favorites</Nav.Link>
            </Nav>
            <div style={{ position: "relative" }}>
            <form onSubmit={handleSubmit}>
                <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            {suggestions.length > 0 ? (
                <div style={{position: "absolute", top: "100%", left: 0, right: 0, backgroundColor: "#000000", zIndex: 20}}>
                {suggestions.map((coin) => (
                    <Nav.Link as={Link} key={coin.id} to={`/coin/${coin.id}`} onClick={() => setQuery("")}>
                    {coin.name} ({coin.symbol})
                    </Nav.Link>
                ))}
                </div>
            ) : null}
            </div>
        </div>
        </div>
    );
}

export default NavBar;