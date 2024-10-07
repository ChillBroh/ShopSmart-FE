import React, { useState } from "react";
import { Container, Button, Table } from "react-bootstrap";
import Swal from "sweetalert2";

const OrderManagementCSR = () => {
  const orders = [
    {
      orderId: "aaa43439-cba0-46ab-984a-62d8afa3c809",
      customer: "sehan",
      email: "sehan@gmail.com",
      status: "Pending",
      vendorStatus: "Processing",
    },
    {
      orderId: "fd3a2e1c-8b4f-49c3-a0f4-1e7d9e6e8ab3",
      customer: "umesha",
      email: "umesha@gmail.com",
      status: "Delivered",
      vendorStatus: "Delivered",
    },
    {
      orderId: "b726fb13-ecb5-4d8c-8c9a-fcf91676d842",
      customer: "falcon",
      email: "falcon@gmail.com",
      status: "Delivered",
      vendorStatus: "Cancel",
    },
  ];

  const [filter, setFilter] = useState("all");

  const handleCancel = (orderId) => {
    Swal.fire({
      title: "Add Note",
      input: "text",
      showCancelButton: true,
      confirmButtonText: "Cancel Order",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Cancelled",
          `Order with ID: ${orderId} cancelled successfully!`,
          "success"
        );
      }
    });
  };

  const handleMarkAsDelivered = (orderId) => {
    Swal.fire(
      "Delivered",
      `Order with ID: ${orderId} marked as delivered!`,
      "success"
    );
  };

  const filteredOrders = orders.filter((order) => {
    if (filter === "all") return true;
    if (filter === "delivered") return order.vendorStatus === "Delivered";
    if (filter === "cancelRequested") return order.vendorStatus === "Cancel";
    if (filter === "processing") return order.vendorStatus === "Processing";
    return true;
  });

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Order Management</h2>

      <div className="text-center mb-4">
        <Button
          variant={filter === "all" ? "primary" : "outline-primary"}
          onClick={() => setFilter("all")}
          className="me-2"
        >
          All Orders
        </Button>
        <Button
          variant={filter === "delivered" ? "primary" : "outline-primary"}
          onClick={() => setFilter("delivered")}
          className="me-2"
        >
          Delivered Products
        </Button>
        <Button
          variant={filter === "cancelRequested" ? "primary" : "outline-primary"}
          onClick={() => setFilter("cancelRequested")}
          className="me-2"
        >
          Cancel Requested Products
        </Button>
        <Button
          variant={filter === "processing" ? "primary" : "outline-primary"}
          onClick={() => setFilter("processing")}
        >
          Processing Products
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Email</th>
            <th>Status</th>
            <th>Vendor Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{order.customer}</td>
              <td>{order.email}</td>
              <td>{order.status}</td>
              <td>{order.vendorStatus}</td>
              <td>
                {order.vendorStatus === "Cancel" ? (
                  <Button
                    variant="danger"
                    onClick={() => handleCancel(order.orderId)}
                    className="me-2"
                  >
                    Cancel
                  </Button>
                ) : order.vendorStatus === "Processing" ? (
                  <Button
                    variant="success"
                    onClick={() => handleMarkAsDelivered(order.orderId)}
                  >
                    Mark as Delivered
                  </Button>
                ) : (
                  <></>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default OrderManagementCSR;
