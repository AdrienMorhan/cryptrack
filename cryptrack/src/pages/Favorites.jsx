import { useState, useEffect } from "react";
import { Link } from "react-router";
import CoinList from "../components/CoinList";

function Favorites(props) {
    const [coins, setCoins] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            if (props.favorites.length === 0) {
                setCoins([]);
                setIsLoading(false);
                return;
            }
            try {
                const res = await fetch(
                    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${props.favorites.join(",")}`,
                    { headers: { "x-cg-demo-api-key": import.meta.env.VITE_API_KEY } }
                );
                if (!res.ok) {
                    throw new Error(`Error: ${res.status}`);
                }
                const data = await res.json();
                setCoins(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        getData();
    }, [props.favorites]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            {coins.length === 0 ? (
                <div className="text-center py-5">
                    <h1 className="display-3 fw-bold">Cryptrack</h1>
                    <Link to="/" className="link-no-favorite">Look for favorite</Link>
                </div>
                ) : (
                <div>
                    <h1 className="fw-bold mb-4">Favorites</h1>
                    <CoinList coins={coins} />
                </div>
            )}
        </div>
    );
}

export default Favorites;