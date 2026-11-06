import { Card } from "react-bootstrap";
import { Link } from "react-router";

function CoinCard(props) {

    let backgroundColor;
    let borderColor;
    let textColor = "white";

    if (props.change < -3) {
        backgroundColor = "rgba(219, 0, 22, 0.6)";
        borderColor = "rgb(219, 0, 22)";
    } else if (props.change < 0) {
        backgroundColor = "rgba(255, 159, 167, 0.6)";
        borderColor = "rgb(255, 159, 167)";
    } else if (props.change <= 3) {
        backgroundColor = "rgba(160, 255, 179, 0.6)";
        borderColor = "rgb(160, 255, 179)";
    } else {
        backgroundColor = "rgba(0, 201, 67, 0.6)";
        borderColor = "rgb(0, 201, 67)";
    }

    return (
        <Card as = {Link} to = {`/coin/${props.id}`} className="text-center h-100 coin-card" style={{ backgroundColor: backgroundColor, color: textColor }}>
        <Card.Body>
            <img src={props.image} alt={props.name} width="48" height="48" />
            <Card.Title>{props.rank} - {props.name}</Card.Title>
            <Card.Text>
            {props.price} ${" "}
            <span style={{ color: "white", fontWeight: "bold" }}>
                ({props.change?.toFixed(2)} %)
            </span>
            </Card.Text>
        </Card.Body>
        </Card>
    );
}

export default CoinCard;