import { useState, useEffect } from "react";

function Converter() {
  const [coins, setCoins] = useState([]);
  const [selected, setSelected] = useState("bitcoin");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1",
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
  }, []);

  if (isLoading) return <p>Loading converter...</p>;
  if (error) return <p>Converter error: {error}</p>;

  const coin = coins.find((c) => c.id === selected);
  const total = coin ? Number(amount) * coin.current_price : 0;

  return (
    <div className="converter">
      <h3 className="converter-title">Converter</h3>

      <select
        className="converter-select"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        {coins.map((c) => (
          <option key={c.id} value={c.id}>
            {c.symbol.toUpperCase()} - {c.name}
          </option>
        ))}
      </select>

      <div className="converter-row">
        <div className="converter-field">
          <label className="converter-label">Amount</label>
          <input
            className="converter-input"
            type="number"
            min="0"
            placeholder="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <span className="converter-equal">=</span>
        <span className="converter-result">
          {total.toLocaleString(undefined, { maximumFractionDigits: 2 })} €
        </span>
      </div>
    </div>
  );
}

export default Converter;