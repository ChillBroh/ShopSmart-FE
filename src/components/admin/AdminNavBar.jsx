import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const payload = localStorage.getItem("user");
  const user = payload ? JSON.parse(payload) : null;
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("jsonwebtoken");
    navigate("/login");
    window.location.reload();
  };
  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Navbar.Brand className="px-3">Admin Panel</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mx-auto">
          <Nav.Link as={Link} to="/admin/dashboard" className="px-3">
            Dashboard
          </Nav.Link>
          <Nav.Link as={Link} to="/admin/user-management" className="px-3">
            Users
          </Nav.Link>
          <Nav.Link as={Link} to="/admin/vendor-management" className="px-3">
            Vendors
          </Nav.Link>
          <Nav.Link as={Link} to="/admin/product-management" className="px-3">
            Products
          </Nav.Link>
          <Nav.Link as={Link} to="/admin/order-management" className="px-3">
            Orders
          </Nav.Link>
          <Nav.Link as={Link} to="/admin/inventory-management" className="px-3">
            Inventory
          </Nav.Link>
        </Nav>
        <Nav>
          <NavDropdown
            title={user?.userName || "Admin"}
            id="basic-nav-dropdown"
            className="px-5"
          >
            <NavDropdown.Item onClick={onLogout} className="">
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AdminNavbar;
