import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import axios from "../../api/axiosInstance";

const UserManagement = () => {
  const [pendingUsers, setPendingUsers] = useState([]);

  useEffect(() => {
    const fetchPendingUsers = async () => {
      try {
        const response = await axios.get("/User/GetPendingApprovalUsers");
        setPendingUsers(response.data);
      } catch (error) {
        console.error("Error fetching pending users:", error);
      }
    };

    fetchPendingUsers();
  }, []);

  const handleApprove = async (userId) => {
    try {
      await axios.post(`/User/ApproveUser/${userId}`);
      setPendingUsers((prevUsers) =>
        prevUsers.filter((user) => user.userId !== userId)
      );
      console.log(`User with ID ${userId} approved!`);
    } catch (error) {
      console.error("Error approving user:", error);
    }
  };

  const handleDecline = async (userId) => {
    // try {
    //   await axios.post(`/User/DeclineUser/${userId}`);
    //   setPendingUsers((prevUsers) =>
    //     prevUsers.filter((user) => user.userId !== userId)
    //   );
    //   console.log(`User with ID ${userId} declined!`);
    // } catch (error) {
    //   console.error("Error declining user:", error);
    // }
  };

  return (
    <Container>
      <Row>
        <Col className="text-center">
          <h2>User Management</h2>
          {pendingUsers.length > 0 ? (
            <Table striped bordered hover className="mt-4">
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
          ) : (
            <p className="mt-4">No users pending approval.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default UserManagement;
