import { useState, useEffect } from "react";
import CoinCard from "./CoinCard";

function CoinList(props) {
    
    const [perRow, setPerRow] = useState(Math.floor(window.innerWidth / 110));

    useEffect(() => {
        const handleWindowSize = () => {
            setPerRow(Math.floor(window.innerWidth / 110));
        };
        window.addEventListener("resize", handleWindowSize);
        return () => window.removeEventListener("resize", handleWindowSize);
    }, []);
    
    return (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
        {props.coins.map((coin) => (
            <div key={coin.id} style={{ width: `${100 / perRow}%` }}>
                <CoinCard
                    id = {coin.id}
                    name = {coin.name}
                    image = {coin.image}
                    price = {coin.current_price}
                    change = {coin.price_change_percentage_24h}
                />
            </div>
        ))}
        </div>
    );
}

export default CoinList;