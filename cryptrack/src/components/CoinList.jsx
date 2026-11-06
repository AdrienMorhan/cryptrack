import { Row, Col } from "react-bootstrap";
import CoinCard from "./CoinCard";

function CoinList(props) {
  return (
    <Row xs={1} md={2} lg={4} className="g-3">
      {props.coins.map((coin) => (
        <Col key={coin.id}>
          <CoinCard
            rank={coin.market_cap_rank}
            name={coin.name}
            image={coin.image}
            price={coin.current_price}
            change={coin.price_change_percentage_24h}
          />
        </Col>
      ))}
    </Row>
  );
}

export default CoinList;