import {
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
} from "recharts";

function formatTime(timestamp, days) {
  const date = new Date(timestamp);
  if (days === 1) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } else if (days === 7) {
    return (
      date.toLocaleDateString([], { weekday: "short" }) +
      " " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  } else if (days === 30) {
    return date.toLocaleDateString([], { day: "numeric", month: "short" });
  } else {
    return date.toLocaleDateString([], { month: "short", year: "numeric" });
  }
}

function PriceChart(props) {
  const data = props.prices.map((point) => ({
    time: formatTime(point[0], props.days),
    full: new Date(point[0]).toLocaleString(),
    price: point[1],
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="priceGradient" x2="0" y2="1">
            <stop offset="0%" stopColor="#0d6efd" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#0d6efd" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid
          vertical={false}
          stroke="rgba(0, 0, 0, 0.15)"
          strokeWidth={0.5}
        />
        <XAxis dataKey="time" minTickGap={40} tickLine={false} tick={{ fontSize: 10 }}/>
        <YAxis orientation="right" domain={["auto", "auto"]} tickLine={false} tick={{ fontSize: 10 }}/>
        
        <Tooltip
          labelFormatter={(label, payload) =>
            payload && payload.length > 0 ? payload[0].payload.full : label
          }
        />
        <Area
          type="monotone"
          dataKey="price"
          stroke="#0d6efd"
          strokeWidth={1.5}
          fill="url(#priceGradient)"
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default PriceChart;