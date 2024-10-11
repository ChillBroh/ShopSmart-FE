import React, { useState, useEffect } from "react";
import { Container, Form, Button, Table } from "react-bootstrap";
import axios from "../../api/axiosInstance";
import Swal from "sweetalert2";
import Badge from "react-bootstrap/Badge";

const ProductPage = () => {
  const [productData, setProductData] = useState({
    productName: "",
    productCategory: "0",
    price: "",
    stock: "",
    description: "",
  });

  const [activeTab, setActiveTab] = useState("createProduct");
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showPending, setShowPending] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const vendorId = user?.userId;

  useEffect(() => {
    if (activeTab === "viewProducts") {
      handleViewProducts();
    }
  }, [activeTab]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (editingProduct) {
        response = await axios.put(`/Product/UpdateProduct/${editingProduct}`, {
          ...productData,
          productCategory: parseInt(productData.productCategory),
          price: parseFloat(productData.price),
          stock: parseInt(productData.stock),
        });
      } else {
        response = await axios.post("/Product/CreateProduct", {
          ...productData,
          productCategory: parseInt(productData.productCategory),
          price: parseFloat(productData.price),
          stock: parseInt(productData.stock),
          vendorId,
        });
      }

      if (response.status === 200) {
        Swal.fire("Success", "Product saved successfully!", "success");
        setProductData({
          productName: "",
          productCategory: "0",
          price: "",
          stock: "",
          description: "",
        });
        setEditingProduct(null);
        handleViewProducts();
      }
    } catch (error) {
      Swal.fire("Error", "Failed to save product. Please try again.", "error");
    }
  };

  const handleViewProducts = async () => {
    try {
      const response = await axios.get("/Product/GetAllProducts");
      const filteredProducts = response.data.filter(
        (product) => product.vendorId === vendorId
      );
      setProducts(filteredProducts);
      setShowPending(false); // Reset when viewing all products
    } catch (error) {
      Swal.fire(
        "Error",
        "Failed to fetch products. Please try again.",
        "error"
      );
    }
  };

  const handleViewPendingProducts = async () => {
    try {
      const response = await axios.get("/Product/GetAllProducts");
      const pendingProducts = response.data.filter(
        (product) => product.vendorId === vendorId && !product.adminApproved
      );
      setProducts(pendingProducts);
      setShowPending(true); // Set the pending filter
      setActiveTab("viewProducts"); // Ensure we stay on the "viewProducts" tab
    } catch (error) {
      Swal.fire(
        "Error",
        "Failed to fetch pending products. Please try again.",
        "error"
      );
    }
  };

  const handleEdit = (product) => {
    setProductData({
      productName: product.productName,
      productCategory: product.productCategory.toString(),
      price: product.price,
      stock: product.stock,
      description: product.description,
    });
    setEditingProduct(product.productId);
    setActiveTab("createProduct");
  };

  const handleDelete = async (productId) => {
    try {
      const response = await axios.delete(
        `/Product/DeleteProduct/${productId}`
      );
      if (response.status === 200) {
        Swal.fire("Success", "Product deleted successfully!", "success");
        handleViewProducts();
      }
    } catch (error) {
      Swal.fire(
        "Error",
        "Failed to delete product. Please try again.",
        "error"
      );
    }
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Product Management</h2>

      <div className="text-center mb-4">
        <Button
          variant={
            activeTab === "createProduct" ? "primary" : "outline-primary"
          }
          onClick={() => {
            setActiveTab("createProduct");
            setEditingProduct(null);
            setShowPending(false); // Ensure the pending state is reset
            setProductData({
              productName: "",
              productCategory: "0",
              price: "",
              stock: "",
              description: "",
            });
          }}
          className="me-2"
        >
          Create Product
        </Button>
        <Button
          variant={
            activeTab === "viewProducts" && !showPending
              ? "primary"
              : "outline-primary"
          }
          onClick={() => {
            setActiveTab("viewProducts");
            setShowPending(false); // Reset when viewing all products
          }}
          className="me-2"
        >
          View Products
        </Button>
        <Button
          variant={showPending ? "primary" : "outline-primary"}
          onClick={handleViewPendingProducts}
        >
          View Pending Products
        </Button>
      </div>

      {activeTab === "createProduct" && (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="productName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product name"
              name="productName"
              value={productData.productName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="productCategory">
            <Form.Label>Product Category</Form.Label>
            <Form.Control
              as="select"
              name="productCategory"
              value={productData.productCategory}
              onChange={handleChange}
              required
            >
              <option value="0">Electronics</option>
              <option value="1">Clothing</option>
              <option value="2">Home Appliances</option>
              <option value="3">Books</option>
              <option value="4">Beauty Products</option>
              <option value="5">Sports</option>
              <option value="6">Toys</option>
              <option value="7">Furniture</option>
              <option value="8">Groceries</option>
              <option value="9">Automotive</option>
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter product price"
              name="price"
              value={productData.price}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="stock">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter stock quantity"
              name="stock"
              value={productData.stock}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter product description"
              name="description"
              value={productData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            {editingProduct ? "Update Product" : "Create Product"}
          </Button>
        </Form>
      )}

      {activeTab === "viewProducts" && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Threshold</th>
              <th>Availability</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.productId}>
                  <td>{product.productId}</td>
                  <td>{product.productName}</td>
                  <td>{product.productCategory}</td>
                  <td>{product.price}</td>
                  <td>{product.stock}</td>
                  <td>
                    {product.stock >= 10 ? (
                      <Badge bg="success">Good</Badge>
                    ) : product.stock == 0 ? (
                      <Badge bg="danger">Stock Empty</Badge>
                    ) : (
                      <Badge bg="warning">Low Stock</Badge>
                    )}
                  </td>
                  <td>{product.adminApproved ? "Approved" : "Pending"}</td>
                  <td>{product.description}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => handleEdit(product)}
                      className="me-2"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(product.productId)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center">
                  No products available.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default ProductPage;
