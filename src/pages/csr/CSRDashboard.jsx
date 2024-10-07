import React, { useState } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import Swal from "sweetalert2";

// Dashboard Component
const CSRDashBoard = () => {
  const userChartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Users Growth",
        data: [100, 120, 150, 170, 200, 230, 250],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: false,
      },
    ],
  };

  const orderChartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Orders",
        data: [20, 25, 30, 50, 60, 75, 100],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: false,
      },
    ],
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">CSR Dashboard</h2>
      <Row>
        <Col md={6}>
          <Line data={userChartData} options={{ responsive: true }} />
        </Col>
        <Col md={6}>
          <Line data={orderChartData} options={{ responsive: true }} />
        </Col>
      </Row>
    </Container>
  );
};
export default CSRDashBoard;
