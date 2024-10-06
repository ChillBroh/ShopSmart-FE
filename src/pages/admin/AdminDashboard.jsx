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

const AdminDashboard = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Monthly Revenue",
        data: [400, 450, 300, 500, 600, 700, 800],
        fill: false,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
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
        text: "Revenue Over Time",
      },
    },
  };

  return (
    <Container fluid className="d-flex flex-column align-items-center">
      <Row className="w-100">
        {/* Sidebar */}

        {/* Main Content Area */}
        <Col xs={10} className="d-flex flex-column align-items-center">
          <header className="bg-white p-3 text-center w-100">
            <h1>Welcome to the Admin Dashboard</h1>
            <p>Your recent activities and stats</p>
          </header>

          <div className="content p-4 w-100">
            {/* Chart Area */}
            <Row className="mb-4 justify-content-center">
              <Col md={10} className="text-center">
                <Line data={data} options={options} />
              </Col>
            </Row>

            {/* Card Data Area */}
            <Row className="justify-content-center">
              <Col md={6} className="mb-4 text-center">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Total Users</h5>
                    <p className="card-text">150</p>
                  </div>
                </div>
              </Col>

              <Col md={6} className="mb-4 text-center">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Total Orders</h5>
                    <p className="card-text">75</p>
                  </div>
                </div>
              </Col>
            </Row>

            <Row className="justify-content-center">
              <Col md={6} className="mb-4 text-center">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Total Revenue</h5>
                    <p className="card-text">$1,200</p>
                  </div>
                </div>
              </Col>

              <Col md={6} className="mb-4 text-center">
                <div className="card">
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
