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
            `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&community_data=false&developer_data=false`,
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

    const md = coin.market_data;

    const formatUsd = (value) => {
        return value === null || value === undefined ? "N/A" : `${value.toLocaleString()} $`;
    };

    const formatNumber = (value) => {
        return value === null || value === undefined ? "N/A" : value.toLocaleString();
    };

    const formatDate = (value) => {
        return value ? new Date(value).toLocaleDateString() : "N/A";
    };

    const stats = [
        { label: "Market cap", value: formatUsd(md?.market_cap?.usd) },
        { label: "24h volume", value: formatUsd(md?.total_volume?.usd) },
        { label: "Circulating supply", value: formatNumber(md?.circulating_supply) },
        { label: "Total supply", value: formatNumber(md?.total_supply) },
        { label: "Created", value: formatDate(coin.genesis_date) },
        { label: "All-time high", value: formatUsd(md?.ath?.usd) }
    ];    

    return (
        <div className="detail-page">
            <div className="detail-header">
                <div className="detail-title">
                    <img className="detail-logo" src={coin.image?.small} alt={coin.name}/>
                    <h2 className="detail-name">{coin.name}</h2>
                </div>
                <ButtonGroup className="detail-periods">
                    {periods.map((p) => (
                        <Button key={p.value} variant={days === p.value ? "primary" : "outline-primary"} onClick={() => setDays(p.value)}>
                            {p.label}
                        </Button>
                    ))}
                </ButtonGroup>
            </div>
            <div className="detail-favorite">
                <FavoriteButton 
                isFavorite={props.favorites.includes(id)}
                onToggle={() => props.onToggleFavorite(id)}
                />
            </div>

            <Card className="detail-chart">
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

            <Card className="detail-about">
                <Card.Body>
                <Card.Title>About {coin.name}</Card.Title>
                    <div className="detail-stats">
                        {stats.map((s) => (
                            <div key={s.label} className="stat-row">
                                <span className="stat-label">{s.label}: </span>
                                <span className="stat-value">{s.value}</span>
                            </div>
                        ))}
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}


export default CoinDetail;