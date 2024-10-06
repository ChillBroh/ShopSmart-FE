import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import registerImage from "../assets/user/register.jpg"; // Update with your actual image path
import { Link } from "react-router-dom";
import axios from "../api/axiosInstance";
import InputGroup from "react-bootstrap/InputGroup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [validated, setValidated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        const response = await axios.post("/User/Register", formData);
        console.log(response.data);
        alert("Registration successful!");
        navigate("/login");
      } catch (error) {
        console.error("Error registering user:", error);
        alert("Registration failed!");
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
  return (
    <div className="pt-5">
      <Row className="align-items-center px-5">
        {/* Left side for form */}
        <Col md={6}>
          <h2 className="text-lg mb-5 mt-5">Create Your Account</h2>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group as={Col} controlId="validationCustomFirstName">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please input your Username!
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              as={Col}
              controlId="validationCustomEmail"
              className="mt-3"
            >
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email!
              </Form.Control.Feedback>
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

            <Form.Group
              as={Col}
              controlId="validationCustomPhone"
              className="mt-3"
            >
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid phone number!
              </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" className="mt-4">
              Register
            </Button>
            <Link to="/login" className="mt-3 d-block text-decoration-none">
              Already a member? Login
            </Link>
          </Form>
        </Col>

        {/* Right side for image */}
        <Col md={6}>
          <Image src={registerImage} fluid />
        </Col>
      </Row>
    </div>
  );
};

export default Register;
