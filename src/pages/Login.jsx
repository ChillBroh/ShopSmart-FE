import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import signIn from "../assets/user/signin.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((showPassword) => !showPassword);
  };

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
                <Form.Control type="email" placeholder="Email" required />
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
                  placeholder="Password"
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
    </div>
  );
};

export default Login;
