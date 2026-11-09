import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function PriceChart(props) {
  const data = props.prices.map((point) => ({
    time: new Date(point[0]).toLocaleDateString(),
    price: point[1],
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <XAxis dataKey="time" minTickGap={40} tickLine={false} tick={{ fontSize: 10 }}/>
        <YAxis orientation="right" domain={["auto", "auto"]} tickLine={false} tick={{ fontSize: 10 }}/>
        <Tooltip />
        <Line type="monotone" dataKey="price" dot={false} stroke="#0d6efd" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default PriceChart;