import { Button } from "react-bootstrap";

function FavoriteButton(props) {
  return (
    <Button
      className="w-100"
      variant={props.isFavorite ? "danger" : "outline-danger"}
      onClick={props.onToggle}
    >
      Favorite {props.isFavorite ? "♥" : "♡"}
    </Button>
  );
}

export default FavoriteButton;