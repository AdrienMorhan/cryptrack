import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import { Row, Col } from "react-bootstrap";

function CoinDetail() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}`
        );
        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`);
        }
        const data = await res.json();
        setCoin(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [id]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Link to="/">← Back to market</Link>
      <Row className="mt-3">
        <Col md={4}>
          <div className="d-flex align-items-center mb-3">
            <img src={coin.image.small} alt={coin.name} width="48" height="48" />
            <h2 className="ms-3 mb-0">{coin.name}</h2>
          </div>
          <p>Rank: {coin.market_cap_rank}</p>
          <p>Market cap: {coin.market_data.market_cap.usd.toLocaleString()} $</p>
        </Col>
        <Col md={8}>
          <p>graph</p>
        </Col>
      </Row>
    </div>
  );
}

export default CoinDetail;