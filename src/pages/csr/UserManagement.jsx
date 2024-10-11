import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import axios from "../../api/axiosInstance";
import Swal from "sweetalert2";
import Badge from "react-bootstrap/Badge";

const UserManagementCSR = () => {
  const [activeTab, setActiveTab] = useState("pendingUsers");
  const [pendingUsers, setPendingUsers] = useState([]);
  const [deactivatedUsers, setDeactivatedUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data: users } = await axios.get("User/GetAllUsers");

      setPendingUsers(users.filter((user) => !user.adminOrCSRApproved));
      setDeactivatedUsers(users.filter((user) => !user.activeUser));
      setAllUsers(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      Swal.fire(
        "Error",
        "Failed to fetch users. Please try again later.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleApprove = async (userId) => {
    try {
      await axios.post(`/User/ApproveUser/${userId}`);
      setPendingUsers((prevUsers) =>
        prevUsers.filter((user) => user.userId !== userId)
      );
      Swal.fire(
        "Approved",
        `User with ID: ${userId} approved successfully!`,
        "success"
      );
    } catch (error) {
      console.error("Error approving user:", error);
      Swal.fire("Error", "Failed to approve user. Please try again.", "error");
    }
  };

  const handleDecline = async (userId) => {
    try {
      await axios.post(`/User/DeclineUser/${userId}`);
      setPendingUsers((prevUsers) =>
        prevUsers.filter((user) => user.userId !== userId)
      );
      Swal.fire("Declined", `User with ID: ${userId} declined.`, "error");
    } catch (error) {
      console.error("Error declining user:", error);
      Swal.fire("Error", "Failed to decline user. Please try again.", "error");
    }
  };

  const handleActivateDeactivate = async (userId) => {
    try {
      await axios.put(
        `User/ActivateOrDeactivateUser?userId=${userId}&userActivateDeactivate=1`
      );
      Swal.fire({
        icon: "success",
        title: "User status updated successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      fetchUsers();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error updating user status",
        text: error.response?.data?.message || "An error occurred",
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">User Management</h2>
      <div className="text-center mb-4">
        {["pendingUsers", "deactivatedUsers", "allUsers"].map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? "primary" : "outline-primary"}
            onClick={() => setActiveTab(tab)}
            className="me-2"
          >
            {tab.charAt(0).toUpperCase() +
              tab.slice(1).replace(/Users/, " Accounts")}
          </Button>
        ))}
      </div>

      {activeTab === "pendingUsers" && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Phone Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingUsers.map((user) => (
              <tr key={user.userId}>
                <td>{user.userId}</td>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.phoneNumber}</td>
                <td>
                  <Button
                    variant="success"
                    onClick={() => handleApprove(user.userId)}
                    className="me-2"
                  >
                    Approve
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDecline(user.userId)}
                  >
                    Decline
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {activeTab === "deactivatedUsers" && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {deactivatedUsers.map((user) => (
              <tr key={user.userId}>
                <td>{user.userId}</td>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => handleActivateDeactivate(user.userId)}
                  >
                    Reactivate
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {activeTab === "allUsers" && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user) => (
              <tr key={user.userId}>
                <td>{user.userId}</td>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <Badge bg={user.activeUser ? "success" : "danger"}>
                    {user.activeUser ? "Active" : "Deactivated"}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default UserManagementCSR;
