import React, { useState, useEffect } from "react";
import { Container, Button, Table } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "../../api/axiosInstance";

const OrderManagementVendor = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");

  const fetchOrders = async () => {
    try {
      const response = await axios.get("Order/GetAllOrders");
      setOrders(response.data);
      console.log("get", response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    if (filter === "all") return true;
    if (filter === "processing") return order.orderStatus === "Processing";
    if (filter === "completed") return order.orderStatus === "Done";
    return true;
  });

  const handleStatus = async (orderId, status) => {
    try {
      await axios.post(`Order/UpdateOrderStatus`, null, {
        params: { orderId, status: status },
      });

      if (status === 0) {
        Swal.fire("Reveresed", `Order is still processing!`, "success");
      } else if (status === 1) {
        Swal.fire("Completed", `Order Completed successfully!`, "success");
      }

      fetchOrders();
    } catch (error) {
      Swal.fire("Error", "Failed to do this action on this order.", "error");
    }
  };

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
          variant={filter === "cancelRequested" ? "primary" : "outline-primary"}
          onClick={() => setFilter("processing")}
          className="me-2"
        >
          New Orders
        </Button>
        <Button
          variant={filter === "processing" ? "primary" : "outline-primary"}
          onClick={() => setFilter("completed")}
        >
          Vendor Completed Orders
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Products</th>
            <th>Quantities</th>
            <th>Order Status</th>
            {filter === "all" ? <></> : <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>
                <ul>
                  {order.productIdsWithPurchasedQuantity.map((item) => (
                    <li key={item.productId}>{item.productId}</li>
                  ))}
                </ul>
              </td>
              <td>
                <ul>
                  {order.productIdsWithPurchasedQuantity.map((item) => (
                    <li key={item.productId}>{item.quantity}</li>
                  ))}
                </ul>
              </td>
              <td>{order.orderStatus}</td>
              {filter === "all" ? (
                <></>
              ) : (
                <td>
                  <div style={{ display: "flex", gap: "8px" }}>
                    {filter === "completed" ? (
                      <Button
                        variant="warning"
                        onClick={() => handleStatus(order.orderId, 0)}
                      >
                        Mark as processing
                      </Button>
                    ) : filter === "processing" ? (
                      <Button
                        variant="success"
                        onClick={() => handleStatus(order.orderId, 1)}
                      >
                        Mark as Done
                      </Button>
                    ) : (
                      <></>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default OrderManagementVendor;
