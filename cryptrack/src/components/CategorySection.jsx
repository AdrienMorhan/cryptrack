import { Button } from "react-bootstrap";
import CoinList from "./CoinList";

function CategorySection(props) {
  return (
    <div className="mb-5">
      <div className="d-flex align-items-center mb-3">
        <h2 className="fw-bold mb-0 me-3">{props.title}</h2>
        <Button
          size="sm"
          variant="outline-light"
          onClick={props.onToggle}
        >
          {props.isExpanded ? "Show less" : "Show more"}
        </Button>
      </div>
      <CoinList
        coins={props.isExpanded ? props.coins : props.coins.slice(0, 10)}
        perRow={10}
      />
    </div>
  );
}

export default CategorySection;