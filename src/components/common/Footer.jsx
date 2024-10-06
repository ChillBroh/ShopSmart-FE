import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <Container>
        <Row className="align-items-center">
          <Col md={4} className="mb-3 mb-md-0">
            <h4 className="mb-3">ShopSmart</h4>
            <p>
              ShopSmart is your go-to online shopping destination. We offer a
              wide range of high-quality products at competitive prices, all at
              the convenience of your fingertips.
            </p>
          </Col>
          <Col md={4} className="mb-3 mb-md-0 text-center">
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-light text-decoration-none">
                  Home
                </a>
              </li>
              <li>
                <a href="/shop" className="text-light text-decoration-none">
                  Shop
                </a>
              </li>
              <li>
                <a href="/about" className="text-light text-decoration-none">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-light text-decoration-none">
                  Contact Us
                </a>
              </li>
            </ul>
          </Col>
          <Col md={4} className="text-center">
            <h5 className="mb-3">Follow Us</h5>
            <div className="d-flex justify-content-center">
              <a href="https://www.facebook.com" className="text-light me-3">
                <FaFacebook size={24} />
              </a>
              <a href="https://www.twitter.com" className="text-light me-3">
                <FaTwitter size={24} />
              </a>
              <a href="https://www.instagram.com" className="text-light me-3">
                <FaInstagram size={24} />
              </a>
              <a href="https://www.linkedin.com" className="text-light">
                <FaLinkedin size={24} />
              </a>
            </div>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col className="text-center">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} ShopSmart. All Rights Reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
