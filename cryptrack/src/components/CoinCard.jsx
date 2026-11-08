import { Card } from "react-bootstrap";
import { Link } from "react-router";

function CoinCard(props) {

    let backgroundColor;
    let textColor = "white";

    if (props.change < -3) {
        backgroundColor = "rgb(103, 0, 10)";
    } else if (props.change < 0) {
        backgroundColor = "rgb(197, 21, 30)";
    } else if (props.change <= 3) {
        backgroundColor = "rgb(33, 194, 27)";
    } else {
        backgroundColor = "rgb(11, 109, 0)";
    }

    return (
        <Card as = {Link} to = {`/coin/${props.id}`} className="text-center coin-card" style={{ backgroundColor: backgroundColor, color: textColor, fontSize: "0.65rem"}}>
        <Card.Body>
            <img src={props.image} alt={props.name} width="36" height="36" />
            <Card.Title style={{ fontSize: "0.8rem" }}>{props.rank} - {props.name}</Card.Title>
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