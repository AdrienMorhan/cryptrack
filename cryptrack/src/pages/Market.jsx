import { useState, useEffect } from "react";
import CategorySection from "../components/CategorySection";

function Market() {
    const [coins, setCoins] = useState([]);
    const [stableIds, setStableIds] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expanded, setExpanded] = useState(null);

    useEffect(() => {
      const getData = async () => {
        try {
          const res = await fetch(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1"
          );
          if (!res.ok) {
            throw new Error(`HTTP error: ${res.status}`);
          }
          const data = await res.json();
          setCoins(data);

          const stableRes = await fetch(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=stablecoins&per_page=100&page=1"
          );
          if (!stableRes.ok) {
            throw new Error(`HTTP error: ${stableRes.status}`);
          }
          const stableData = await stableRes.json();
          setStableIds(stableData.map((coin) => coin.id));
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };
      getData();
    }, []);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const cleanCoins = coins.filter(
      (coin) =>
        !stableIds.includes(coin.id) &&
        coin.price_change_percentage_24h !== null
    );

    const topCoins = cleanCoins.slice(0, 50);

    const gainers = [...cleanCoins]
      .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
      .slice(0, 50);

    const losers = [...cleanCoins]
      .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
      .slice(0, 50);

    const toggle = (name) => {
      setExpanded(expanded === name ? null : name);
    };

    return (
      <div>
        <h1 className="fw-bold mb-4">Crypto Market</h1>
        <CategorySection
          title="Top market cap"
          coins={topCoins}
          isExpanded={expanded === "top"}
          onToggle={() => toggle("top")}
        />
        <CategorySection
          title="Top gainers"
          coins={gainers}
          isExpanded={expanded === "gainers"}
          onToggle={() => toggle("gainers")}
        />
        <CategorySection
          title="Top losers"
          coins={losers}
          isExpanded={expanded === "losers"}
          onToggle={() => toggle("losers")}
        />
      </div>
    );
}

export default Market;