import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import { Row, Col, Button, ButtonGroup, Card } from "react-bootstrap";
import PriceChart from "../components/PriceChart";
import FavoriteButton from "../components/FavoriteButton";

function CoinDetail(props) {
    const { id } = useParams();
    const [coin, setCoin] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [days, setDays] = useState(7);
    const [prices, setPrices] = useState([]);
    const [chartLoading, setChartLoading] = useState(true);
    const [chartError, setChartError] = useState(null);

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

    useEffect(() => {
        const getChart = async () => {
        setChartLoading(true);
        setChartError(null);
        try {
            const res = await fetch(
            `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`
            );
            if (!res.ok) {
            throw new Error(`HTTP error: ${res.status}`);
            }
            const data = await res.json();
            setPrices(data.prices);
        } catch (err) {
            setChartError(err.message);
        } finally {
            setChartLoading(false);
        }
        };
        getChart();
    }, [id, days]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const periods = [
        { label: "1D", value: 1 },
        { label: "1W", value: 7 },
        { label: "1M", value: 30 },
        { label: "1Y", value: 365 },
    ];

    return (
        <div>
        <Link to="/">Back to market</Link>
        <Row className="mt-3">
            <Col md={4}>
            <div className="d-flex align-items-center mb-3">
                <img src={coin.image.small} alt={coin.name} width="48" height="48" />
                <h2 className="ms-3 mb-0">{coin.name}</h2>
            </div>
            <ButtonGroup className="mb-3">
                {periods.map((p) => (
                <Button
                    key={p.value}
                    variant={days === p.value ? "primary" : "outline-primary"}
                    onClick={() => setDays(p.value)}
                >
                    {p.label}
                </Button>
                ))}
            </ButtonGroup>
            <Card className="mb-2">
                <Card.Body>Rank: {coin.market_cap_rank}</Card.Body>
            </Card>
            <Card>
                <Card.Body>
                    Market cap: {coin.market_data.market_cap.usd.toLocaleString()} $
                </Card.Body>
            </Card>
            <FavoriteButton
            isFavorite={props.favorites.includes(id)}
            onToggle={() => props.onToggleFavorite(id)}
            />
            </Col>
            <Col md={8}>
                <Card>
                    <Card.Body>
                        {chartLoading && <p>Loading chart...</p>}
                        {chartError && <p>Error: {chartError}</p>}
                        {!chartLoading && !chartError && <PriceChart prices={prices} days={days} />}
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        </div>
    );
}

export default CoinDetail;