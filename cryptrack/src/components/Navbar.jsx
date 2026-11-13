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
            `https://api.coingecko.com/api/v3/search?query=${query}`,
            { headers: { "x-cg-demo-api-key": import.meta.env.VITE_API_KEY } }
            );
            if (!res.ok) {
                throw new Error(`Error: ${res.status}`);
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
        if (query.length >= 3) { // only suggestion after 3 similar letters because otherwise there are too many requests
            getData();
        } else {
            setSuggestions([]);
        }
        }, 800);
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
        <div className="navbar">
            <h1 className="title">CrypTrack</h1>
            <div style={{ display: "flex", alignItems: "center"}}>
                <Nav>
                <Nav.Link className="link" as={Link} to="/" >Market</Nav.Link>
                <Nav.Link className="link" as={Link} to="/favorites">Favorites</Nav.Link>
                </Nav>
                <div style={{ position: "relative" }}>
                <form onSubmit={handleSubmit}>
                    <input
                    className="search-input"
                    placeholder="Search a crypto"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    />
                    <button type="submit" className="search-button">Search</button>
                </form>
                {suggestions.length > 0 ? (
                    <div className="suggest">
                    {suggestions.map((coin) => (
                        <Nav.Link className="nav-link" as={Link} key={coin.id} to={`/coin/${coin.id}`} onClick={() => setQuery("")}>
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