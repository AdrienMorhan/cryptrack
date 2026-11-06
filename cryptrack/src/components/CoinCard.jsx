import { Card } from "react-bootstrap";

function CoinCard(props) {

    let backgroundColor;
    let textColor = "black";

    if (props.change < -3) {
        backgroundColor = "rgb(219, 0, 22)";
        textColor = "black";
    } else if (props.change < 0) {
        backgroundColor = "rgb(255, 159, 167)";
    } else if (props.change <= 3) {
        backgroundColor = "rgb(160, 255, 179)";
    } else {
        backgroundColor = "rgb(0, 201, 67)";
        textColor = "black";
    }

    return (
        <Card className="text-center h-100 coin-card" style={{ backgroundColor: backgroundColor, color: textColor }}>
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