import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2

const CSRManagement = () => {
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: 2,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        const response = await axios.post("/User/Register", formData); // Adjust the endpoint based on your API
        console.log(response.data);

        // Show success alert
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "CSR added successfully!",
        });

        // Optionally, navigate to another page after a short delay
        // setTimeout(() => {
        //   navigate("admin/dashboard"); // Adjust the redirect path as needed
        // }, 2000);
      } catch (error) {
        console.error("Error adding CSR:", error);

        // Show error alert
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Failed to add CSR!",
        });
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

  return (
    <div className="">
      <Row className="align-items-center px-5">
        {/* Left side for form */}
        <Col md={12}>
          <h2 className="text-lg mb-5 mt-5">
            Add New Customer Service Representative
          </h2>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group as={Col} controlId="validationCustomUsername">
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
                Please input the CSR's username!
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
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a password!
              </Form.Control.Feedback>
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

            {/* Align button to the right */}
            <Form.Group as={Col} className="mt-4 text-end">
              <Button type="submit">Add CSR</Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default CSRManagement;
