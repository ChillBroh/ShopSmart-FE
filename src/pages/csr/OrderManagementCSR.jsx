import React, { useState, useEffect } from "react";
import { Container, Button, Table } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "../../api/axiosInstance";

const OrderManagementCSR = () => {
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
    if (filter === "delivered") return order.orderStatus === "Delivered";
    if (filter === "cancelRequested") return order.orderStatus === "Canceled";
    if (filter === "done") return order.orderStatus === "Done";
    return true;
  });

  const handleStatus = async (orderId, status) => {
    try {
      await axios.post(`Order/UpdateOrderStatus`, null, {
        params: { orderId, status: status },
      });
      if (status === 2) {
        Swal.fire(
          "Delivered",
          `Order with ID: ${orderId} Delivered successfully!`,
          "success"
        );
      }
      fetchOrders();
    } catch (error) {
      Swal.fire("Error", "Failed to do this action on this order.", "error");
    }
  };

  const handleDelete = async (orderId) => {
    let note = "";

    const { value } = await Swal.fire({
      title: "Add Note",
      input: "text",
      confirmButtonText: "Cancel Order",
    });
    note = value;

    try {
      await axios.delete(`Order/DeleteOrder/${orderId}`);
      Swal.fire(
        "Deleted",
        `Order cancelled with ${note} and deleted successfully!`,
        "success"
      );
      fetchOrders();
    } catch (error) {
      Swal.fire("Error", "Failed to delete order.", "error");
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
          variant={filter === "delivered" ? "primary" : "outline-primary"}
          onClick={() => setFilter("delivered")}
          className="me-2"
        >
          Delivered Orders
        </Button>
        <Button
          variant={filter === "cancelRequested" ? "primary" : "outline-primary"}
          onClick={() => setFilter("cancelRequested")}
          className="me-2"
        >
          Cancel Requested Orders
        </Button>
        <Button
          variant={filter === "processing" ? "primary" : "outline-primary"}
          onClick={() => setFilter("done")}
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
                    {filter === "done" ? (
                      <Button
                        variant="success"
                        onClick={() => handleStatus(order.orderId, 2)}
                      >
                        Mark as Shipped
                      </Button>
                    ) : (
                      <></>
                    )}
                    {filter === "cancelRequested" ? (
                      <Button
                        variant="outline-danger"
                        onClick={() => handleDelete(order.orderId)}
                      >
                        Delete Order
                      </Button>
                    ) : (
                      <></>
                    )}
                    {filter === "delivered" ? (
                      <p className="text-success">
                        Order has successfully Completed
                      </p>
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

export default OrderManagementCSR;
