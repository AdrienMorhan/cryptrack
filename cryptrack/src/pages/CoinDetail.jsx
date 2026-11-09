import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Button, ButtonGroup, Card } from "react-bootstrap";
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
            `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false`,
            { headers: { "x-cg-demo-api-key": import.meta.env.VITE_API_KEY } }
            );
            if (!res.ok) {
            throw new Error(`Error: ${res.status}`);
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
            `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`,
            { headers: { "x-cg-demo-api-key": import.meta.env.VITE_API_KEY } }
            );
            if (!res.ok) {
            throw new Error(`Error: ${res.status}`);
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
        <div style={{maxWidth: 900, margin: "0 auto"}}>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16}}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <img src={coin.image?.small} alt={coin.name} width="48" height="48" />
                    <h2 className="ms-3 mb-0">{coin.name}</h2>
                </div>
                <ButtonGroup>
                    {periods.map((p) => (<Button key={p.value} variant={days === p.value ? "primary" : "outline-primary"} onClick={() => setDays(p.value)}>
                    {p.label}
                    </Button>
                ))}
                </ButtonGroup>
            </div>
            <div style={{ marginBottom: 16, textAlign: "center"}}>
            <FavoriteButton
            isFavorite={props.favorites.includes(id)}
            onToggle={() => props.onToggleFavorite(id)}
            style={{ width: 200,  }}
            />
            </div>

            <Card className="mb-3">
                <Card.Body className="p-1">
                {chartLoading && <p>Loading chart...</p>}
                {chartError && <p>Error: {chartError}</p>}
                {!chartLoading && !chartError && prices.length === 0 && (
                    <p>No chart data available for this crypto.</p>
                )}
                {!chartLoading && !chartError && prices.length > 0 && (
                    <PriceChart prices={prices} days={days} />
                )}
                </Card.Body>
            </Card>

            <Card>
                <Card.Body>
                <Card.Title>About {coin.name}</Card.Title>
                <p>
                    Market cap: {coin.market_data?.market_cap?.usd?.toLocaleString()} $
                </p>
                </Card.Body>
            </Card>
        </div>
    );
}


export default CoinDetail;