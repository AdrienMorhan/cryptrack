import { Link, useParams } from "react-router";

function CoinDetail() {
  const { id } = useParams();

  return (
    <div>
      <Link to="/">← Back to market</Link>
      <h2>{id}</h2>
    </div>
  );
}

export default CoinDetail;