import { Link } from "react-router";
import { Nav } from "react-bootstrap";

function NavBar() {
  return (
    <Nav>
      <Nav.Link as={Link} to="/">Market</Nav.Link>
    </Nav>
  );
}

export default NavBar;