import { Button } from "react-bootstrap";

function FavoriteButton(props) {
  return (
    <Button
      variant={props.isFavorite ? "danger" : "outline-danger"}
      onClick={props.onToggle}
      style={props.style}
    >
      Favorite {props.isFavorite ? "♥" : "♡"}
    </Button>
  );
}

export default FavoriteButton;