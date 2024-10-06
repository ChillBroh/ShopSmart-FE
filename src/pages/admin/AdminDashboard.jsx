import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}

        {/* Main Content Area */}
        <Col xs={10}>
          <header className="bg-white p-3 text-center">
            <h1>Welcome to the Admin Dashboard</h1>
            <p>Your recent activities and stats</p>
          </header>

          <div className="content p-4">
            <Row>
              <Col md={6}>
                <div className="card mb-4">
                  <div className="card-body">
                    <h5 className="card-title">Total Users</h5>
                    <p className="card-text">150</p>
                  </div>
                </div>
              </Col>

              <Col md={6}>
                <div className="card mb-4">
                  <div className="card-body">
                    <h5 className="card-title">Total Orders</h5>
                    <p className="card-text">75</p>
                  </div>
                </div>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <div className="card mb-4">
                  <div className="card-body">
                    <h5 className="card-title">Total Revenue</h5>
                    <p className="card-text">$1,200</p>
                  </div>
                </div>
              </Col>

              <Col md={6}>
                <div className="card mb-4">
                  <div className="card-body">
                    <h5 className="card-title">Pending Orders</h5>
                    <p className="card-text">5</p>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <div className="card mb-4">
                  <div className="card-body">
                    <h5 className="card-title">Total Revenue</h5>
                    <p className="card-text">$1,200</p>
                  </div>
                </div>
              </Col>

              <Col md={6}>
                <div className="card mb-4">
                  <div className="card-body">
                    <h5 className="card-title">Pending Orders</h5>
                    <p className="card-text">5</p>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <div className="card mb-4">
                  <div className="card-body">
                    <h5 className="card-title">Total Revenue</h5>
                    <p className="card-text">$1,200</p>
                  </div>
                </div>
              </Col>

              <Col md={6}>
                <div className="card mb-4">
                  <div className="card-body">
                    <h5 className="card-title">Pending Orders</h5>
                    <p className="card-text">5</p>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
