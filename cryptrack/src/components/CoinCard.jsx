import { Card } from "react-bootstrap";
import { Link } from "react-router";

function CoinCard(props) {

    let backgroundColor;
    let glow;

    if (props.change < -3) {
        backgroundColor = "rgba(197, 21, 30, 0.40)";
        glow = "rgb(201, 2, 12)";
    } else if (props.change < 0) {
        backgroundColor = "rgba(220, 90, 100, 0.22)";
        glow = "rgba(251, 111, 123, 0.85)";
    } else if (props.change <= 3) {
        backgroundColor = "rgba(46, 204, 113, 0.22)";
        glow = "rgba(60, 250, 142, 0.85)";
    } else {
        backgroundColor = "rgba(22, 200, 90, 0.40)";
        glow = "rgb(1, 115, 43)";
    }

    return (
        <Card as = {Link} to = {`/coin/${props.id}`} className="text-center coin-card" style={{ backgroundColor: backgroundColor, color: "white", fontSize: "0.65rem", textShadow: "1px 1px 3px rgba(0, 0, 0, 0.8)", border: `2px solid ${glow}`, boxShadow: `0 0 15px ${glow}`}}>
        <Card.Body>
            <img src={props.image} alt={props.name} width="36" height="36" style={{ filter: "drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.5))" }}/>
            <Card.Title style={{ fontSize: "0.8rem" }}>{props.name}</Card.Title>
            <Card.Text>
            {props.price} ${" "}
            <span style={{ color: "white"}}>
                ({props.change?.toFixed(2)} %)
            </span>
            </Card.Text>
        </Card.Body>
        </Card>
    );
}

export default CoinCard;