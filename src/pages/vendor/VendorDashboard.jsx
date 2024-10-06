import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const VendorDashboard = () => {
  // Sample data for the chart
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Sales",
        data: [10, 20, 30, 40, 50, 60],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Sales Overview",
      },
    },
  };

  return (
    <Container>
      <h2 className="text-center mb-4">Vendor Dashboard</h2>
      <Row>
        <Col className="text-center">
          <Line data={data} options={options} />
        </Col>
      </Row>
    </Container>
  );
};

export default VendorDashboard;
