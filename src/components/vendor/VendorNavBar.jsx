import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa"; // Using Font Awesome for the notification icon

const VendorNavBar = () => {
  const [notificationCount, setNotificationCount] = useState(3); // Initial notification count
  const payload = localStorage.getItem("user");
  const user = payload ? JSON.parse(payload) : null;
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("jsonwebtoken");
    navigate("/login");
    window.location.reload();
  };

  // Simulate increasing notifications
  useEffect(() => {
    setNotificationCount(1);
  });

  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Navbar.Brand className="px-3">Vendor Panel</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mx-auto">
          <Nav.Link as={Link} to="/vendor/dashboard" className="px-3">
            Dashboard
          </Nav.Link>

          <Nav.Link as={Link} to="/vendor/product-management" className="px-3">
            Products
          </Nav.Link>
          <Nav.Link as={Link} to="/vendor/order-management" className="px-3">
            Orders
          </Nav.Link>
        </Nav>
        <Nav>
          <div className="position-relative px-3" style={{ cursor: "pointer" }}>
            <FaBell size={24} />
            {notificationCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-5px",
                  right: "-5px",
                  background: "red",
                  borderRadius: "50%",
                  color: "white",
                  padding: "2px 6px",
                  fontSize: "12px",
                }}
              >
                {notificationCount}
              </span>
            )}
          </div>
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

export default VendorNavBar;
