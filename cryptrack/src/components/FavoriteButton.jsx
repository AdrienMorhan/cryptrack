import { Button } from "react-bootstrap";

function FavoriteButton(props) {
    return (
        <Button
            className="favorite-button"
            variant={props.isFavorite ? "danger" : "outline-danger"}
            onClick={props.onToggle}
        >
            Favorite {props.isFavorite ? "♥" : "♡"}
        </Button>
    );
}

export default FavoriteButton;