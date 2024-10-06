import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Input from "react-bootstrap/FormControl";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import registerImage from "../assets/user/register.jpg"; // Update with your actual image path
import { Link } from "react-router-dom";

const Register = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <div className="pt-5">
      <Row className="align-items-center px-5">
        {/* Left side for form */}
        <Col md={6}>
          <h2 className="text-lg mb-5 mt-5">Create Your Account</h2>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group as={Col} controlId="validationCustomFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="First Name" required />
              <Form.Control.Feedback type="invalid">
                Please input your First Name!
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              as={Col}
              controlId="validationCustomLastName"
              className="mt-3"
            >
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Last Name" required />
              <Form.Control.Feedback type="invalid">
                Please input your Last Name!
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              as={Col}
              controlId="validationCustomEmail"
              className="mt-3"
            >
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Email" required />
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
              <Form.Control type="password" placeholder="Password" required />
              <Form.Control.Feedback type="invalid">
                Please provide a password!
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              as={Col}
              controlId="validationCustomConfirmPassword"
              className="mt-3"
            >
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please confirm your password!
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
