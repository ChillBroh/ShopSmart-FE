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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const pendingResponse = await axios.get(
          "/User/GetPendingApprovalUsers"
        );
        setPendingUsers(pendingResponse.data);

        const deactivatedResponse = await axios.get(
          "/User/GetDeactivatedUsers"
        );
        setDeactivatedUsers(deactivatedResponse.data);

        const allUsersResponse = await axios.get("/User/GetAllUsers");
        setAllUsers(allUsersResponse.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        // Dummy data as fallback
        const dummyPendingUsers = [
          {
            userId: "88850d60-5497-4139-b580-f66da96cd981",
            userName: "IsharaCustomer1",
            email: "isharaCustomer1@example.com",
            phoneNumber: "0766859740",
            role: "Customer",
            status: "pending",
          },
          {
            userId: "98850d60-5497-4139-b580-f66da96cd982",
            userName: "IsharaCustomer2",
            email: "isharaCustomer2@example.com",
            phoneNumber: "0766859740",
            role: "Customer",
            adminOrCSRApproved: false,
            status: "pending",
          },
        ];
        const dummyDeactivatedUsers = [
          {
            userId: "a8850d60-5497-4139-b580-f66da96cd983",
            userName: "IsharaCustomer3",
            email: "isharaCustomer3@example.com",
            phoneNumber: "0766859740",
            role: "Customer",
            adminOrCSRApproved: false,
            status: "deactivated",
          },
          {
            userId: "b8850d60-5497-4139-b580-f66da96cd984",
            userName: "IsharaCustomer4",
            email: "isharaCustomer4@example.com",
            phoneNumber: "0766859740",
            role: "Customer",
            adminOrCSRApproved: false,
            status: "deactivated",
          },
        ];
        const dummyAllUsers = [
          ...dummyPendingUsers,
          ...dummyDeactivatedUsers,
          {
            userId: "c8850d60-5497-4139-b580-f66da96cd985",
            userName: "IsharaCustomer5",
            email: "isharaCustomer5@example.com",
            phoneNumber: "0766859740",
            role: "Customer",
            adminOrCSRApproved: false,
            status: "active",
          },
        ];

        setPendingUsers(dummyPendingUsers);
        setDeactivatedUsers(dummyDeactivatedUsers);
        setAllUsers(dummyAllUsers);
      }
    };

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
      Swal.fire("Error", "Failed to approve user.", "error");
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
      Swal.fire("Error", "Failed to decline user.", "error");
    }
  };

  const handleReactivate = async (userId) => {
    try {
      await axios.post(`/User/ReactivateUser/${userId}`);
      setDeactivatedUsers((prevUsers) =>
        prevUsers.filter((user) => user.userId !== userId)
      );
      Swal.fire(
        "Reactivated",
        `User with ID: ${userId} reactivated successfully!`,
        "success"
      );
    } catch (error) {
      console.error("Error reactivating user:", error);
      Swal.fire("Error", "Failed to reactivate user.", "error");
    }
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">User Management</h2>
      <div className="text-center mb-4">
        <Button
          variant={activeTab === "pendingUsers" ? "primary" : "outline-primary"}
          onClick={() => setActiveTab("pendingUsers")}
          className="me-2"
        >
          Pending Users
        </Button>
        <Button
          variant={
            activeTab === "deactivatedUsers" ? "primary" : "outline-primary"
          }
          onClick={() => setActiveTab("deactivatedUsers")}
          className="me-2"
        >
          Deactivated Accounts
        </Button>
        <Button
          variant={activeTab === "allUsers" ? "primary" : "outline-primary"}
          onClick={() => setActiveTab("allUsers")}
        >
          All Users
        </Button>
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
                    onClick={() => handleReactivate(user.userId)}
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
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user) => (
              <tr key={user.userId}>
                <td>{user.userId}</td>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>
                  {user.status === "active" ? (
                    <Badge bg="success">active</Badge>
                  ) : user.status === "deactivated" ? (
                    <Badge bg="danger">Deactivated</Badge>
                  ) : (
                    <Badge bg="warning" text="dark">
                      pending
                    </Badge>
                  )}{" "}
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
