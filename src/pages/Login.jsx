import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import signIn from "../assets/user/signin.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import axios from "../api/axiosInstance";
import Toaster from "../components/common/Toast";

const Login = () => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // State for Toaster
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success"); // Default to success

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        const response = await axios.post("/User/Login", formData);
        const payload = response.data.loggedInUser;
        setToastMessage("Login successful!");
        setToastType("success"); // Set toast type to success
        setShowToast(true);
        localStorage.setItem("jsonwebtoken", JSON.stringify(payload.token));
        localStorage.setItem("user", JSON.stringify(payload));
        if (payload.role === "Administrator") {
          navigate("/admin/dashboard");
        } else if (payload.role === "Vendor") {
          navigate("/vendor/dashboard");
        } else if (payload.role === "CSR") {
          navigate("/csr/dashboard");
        }

        window.location.reload();
      } catch (error) {
        console.error("Error Login user:", error);
        setToastMessage("Login failed! Please check your credentials.");
        setToastType("error"); // Set toast type to error
        setShowToast(true);
      }
    }
    setValidated(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  // Close handler for toast
  const handleToastClose = () => setShowToast(false);

  return (
    <div className="pt-5">
      <Row className="d-flex px-5 align-items-center">
        {/* Left side for image */}
        <Col md={6}>
          <Image src={signIn} fluid />
        </Col>

        {/* Right side for form */}
        <Col md={6}>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group as={Col} controlId="validationCustomEmail">
              <Form.Label>Email address</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email.toLowerCase()}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid email.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group
              as={Col}
              controlId="validationCustomPassword"
              className="mt-3"
            >
              <Form.Label>Password</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type={showPassword ? "text" : "password"} // Toggle input type between text and password
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <Button
                  variant="outline-secondary"
                  onClick={togglePasswordVisibility}
                  style={{ borderRadius: "0 4px 4px 0" }}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </Button>
                <Form.Control.Feedback type="invalid">
                  Please provide a password.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Button type="submit" className="mt-4">
              Submit
            </Button>
            <Link to="/register" className="mt-3 d-block tex">
              Register Now
            </Link>
          </Form>
        </Col>
      </Row>

      {/* Show Toaster if it's visible */}
      {showToast && (
        <Toaster
          text={toastMessage}
          type={toastType}
          onClose={handleToastClose} // Pass the close handler
        />
      )}
    </div>
  );
};

export default Login;
