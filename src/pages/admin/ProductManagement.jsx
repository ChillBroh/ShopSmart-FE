import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import axios from "../../api/axiosInstance";

const ProductManagement = () => {
  const [activeTable, setActiveTable] = useState("pending");
  const [pendingProducts, setPendingProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [approvedProducts, setApprovedProducts] = useState([]);

  useEffect(() => {
    fetchPendingProducts();
    fetchAllProducts();
    fetchApprovedProducts();
  }, []);

  const fetchPendingProducts = async () => {
    try {
      const response = await axios.get("/Product/GetPendingApprovalProducts");
      setPendingProducts(response.data);
    } catch (error) {
      console.error("Error fetching pending products:", error);
    }
  };

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get("/Product/GetAllProducts");
      setAllProducts(response.data);
    } catch (error) {
      console.error("Error fetching all products:", error);
    }
  };

  const fetchApprovedProducts = async () => {
    try {
      const response = await axios.get("/Product/GetAllApprovedProducts");
      setApprovedProducts(response.data);
    } catch (error) {
      console.error("Error fetching approved products:", error);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.post(`/Product/ApproveProduct/${id}`);
      setPendingProducts((prevProducts) =>
        prevProducts.filter((product) => product.productId !== id)
      );
      fetchApprovedProducts();
      console.log(`Product with ID ${id} approved!`);
    } catch (error) {
      console.error("Error approving product:", error);
    }
  };

  const handleDecline = async (id) => {
    // try {
    //   await axios.put(`/Product/Decline/${id}`);
    //   setPendingProducts((prevProducts) =>
    //     prevProducts.filter((product) => product.productId !== id)
    //   );
    //   console.log(`Product with ID ${id} declined!`);
    // } catch (error) {
    //   console.error("Error declining product:", error);
    // }
  };

  return (
    <Container>
      <Row className="mb-4">
        <Col className="text-center">
          <Button
            variant={activeTable === "all" ? "primary" : "outline-primary"}
            onClick={() => setActiveTable("all")}
            className="me-2"
          >
            All Products
          </Button>
          <Button
            variant={activeTable === "pending" ? "primary" : "outline-primary"}
            onClick={() => setActiveTable("pending")}
            className="me-2"
          >
            Pending
          </Button>
          <Button
            variant={activeTable === "approved" ? "primary" : "outline-primary"}
            onClick={() => setActiveTable("approved")}
          >
            Approved Products
          </Button>
        </Col>
      </Row>

      {/* Table for Pending Products */}
      {activeTable === "pending" && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingProducts.map((product) => (
              <tr key={product.productId}>
                <td>{product.productId}</td>
                <td>{product.productName}</td>
                <td>{product.productCategory}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>{product.adminApproved ? "Approved" : "Pending"}</td>
                <td>
                  <Button
                    variant="success"
                    onClick={() => handleApprove(product.productId)}
                    className="me-2"
                  >
                    Approve
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDecline(product.productId)}
                  >
                    Decline
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Table for All Products */}
      {activeTable === "all" && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map((product) => (
              <tr key={product.productId}>
                <td>{product.productId}</td>
                <td>{product.productName}</td>
                <td>{product.productCategory}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>{product.adminApproved ? "Approved" : "Pending"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Table for Approved Products */}
      {activeTable === "approved" && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {approvedProducts.length > 0 ? (
              approvedProducts.map((product) => (
                <tr key={product.productId}>
                  <td>{product.productId}</td>
                  <td>{product.productName}</td>
                  <td>{product.productCategory}</td>
                  <td>{product.price}</td>
                  <td>{product.stock}</td>
                  <td>{product.adminApproved ? "Approved" : "Pending"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No approved products yet.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default ProductManagement;
