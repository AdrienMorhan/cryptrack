import { Row, Col } from "react-bootstrap";
import CoinCard from "./CoinCard";

function CoinList(props) {
    const perRow = props.perRow || 4;
    return (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
        {props.coins.map((coin) => (
            <div key={coin.id} style={{ width: `${100 / perRow}%` }}>
                <CoinCard
                    id = {coin.id}
                    rank = {coin.market_cap_rank}
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