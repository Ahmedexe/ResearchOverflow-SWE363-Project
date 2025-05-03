import React, { useEffect, useState } from "react";
import "./DataTable.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify"; // Add react-toastify for notifications
 
function createData(name, email, role, status, joinDate) {
  return { name, email, role, status, joinDate };
}

const initialRows = [
  createData(
    "Faisal Alabbas",
    "Faisal@gmail.com",
    "Researcher",
    "Active",
    "16 August 2024"
  ),
  createData(
    "Faisal Alenezi",
    "FMJ@gmail.com",
    "Researcher",
    "Active",
    "17 August 2024"
  ),
  createData(
    "Majed Asiri",
    "mjd@gmail.com",
    "Reader",
    "InActive",
    "4 August 2024"
  ),
];

function DataTable({ displayed = false, initialRows = [] }) {
  const [sortColumn, setSortColumn] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [users, setUsers] = useState(initialRows);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleRoleChange = async (index, newRole) => {
    const updatedUsers = [...users];
    const previousRole = updatedUsers[index].role;
    updatedUsers[index].role = newRole;
    setUsers(updatedUsers);
    setIsLoading(true);

    try {
      await updateRole(updatedUsers[index]._id, newRole);
      toast.success("Role updated successfully");
    } catch (error) {
      console.error("Failed to update role", error);
      toast.error("Failed to update role");
      updatedUsers[index].role = previousRole;
      setUsers([...updatedUsers]);
    } finally {
      setIsLoading(false);
    }
  };

  const sortedUsers = [...users].sort((a, b) => {
    const factor = sortDirection === "asc" ? 1 : -1;
    if (a[sortColumn] > b[sortColumn]) return factor;
    if (a[sortColumn] < b[sortColumn]) return -factor;
    return 0;
  });

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/getUsers");
      console.log("response of users", response);
      response.data && setUsers(response.data.users);
    } catch (error) {
      console.error("error in get users", error);
      toast.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = inputDate
      ? new Intl.DateTimeFormat("en-GB", options).format(date)
      : "";
    return formattedDate;
  };

  const deleteUser = async (id) => {
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/deleteUser/${id}`
      );
      console.log("response of delete", response);
      toast.success("User deleted successfully");
      await getUsers();
    } catch (error) {
      console.error("error in delete user", error);
      toast.error("Failed to delete user");
    } finally {
      setIsLoading(false);
    }
  };

  const updateRole = async (id, role) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/updateUser/${id}`,
        {
          role: role,
        }
      );
      console.log("response of update role", response);
    } catch (error) {
      console.error("error in update role", error);
      throw error; // Re-throw to handle in handleRoleChange
    }
  };

  return (
    <div className="admin-data-table">
      <div className="admin-table-header">
        <h3>Recent Users</h3>
        {displayed && (
          <button
            className="btn btn-warning"
            onClick={() => navigate("/signup")}
            disabled={isLoading}
          >
            Add User
          </button>
        )}
      </div>
      <TableContainer component={Paper} className="admin-table-container-mui">
        <Table sx={{ minWidth: 650 }} aria-label="user data table">
          <TableHead>
            <TableRow>
              <TableCell
                className="admin-table-header-cell"
                onClick={() => handleSort("name")}
              >
                Name{" "}
                {sortColumn === "name" && (sortDirection === "asc" ? "↑" : "↓")}
              </TableCell>
              <TableCell
                className="admin-table-header-cell"
                onClick={() => handleSort("email")}
              >
                Email{" "}
                {sortColumn === "email" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </TableCell>
              <TableCell
                className="admin-table-header-cell"
                onClick={() => handleSort("role")}
              >
                Role{" "}
                {sortColumn === "role" && (sortDirection === "asc" ? "↑" : "↓")}
              </TableCell>
              <TableCell
                className="admin-table-header-cell"
                onClick={() => handleSort("joinDate")}
              >
                Join Date{" "}
                {sortColumn === "joinDate" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </TableCell>
              {displayed && (
                <TableCell className="admin-table-header-cell">
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedUsers.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  className="admin-table-cell"
                >
                  {row?.fname} {row?.lname}
                </TableCell>
                <TableCell className="admin-table-cell">{row.email}</TableCell>
                <TableCell className="admin-table-cell">
                  {displayed ? (
                    <select
                      value={row?.role}
                      onChange={(e) => handleRoleChange(index, e.target.value)}
                      disabled={isLoading}
                    >
                      <option value="Reader">Reader</option>
                      <option value="Researcher">Researcher</option>
                    </select>
                  ) : (
                    row?.role
                  )}
                </TableCell>
                <TableCell className="admin-table-cell">
                  {formatDate(row?.createdAt)}
                </TableCell>
                {displayed && (
                  <TableCell className="admin-table-cell">
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteUser(row?._id)}
                      disabled={isLoading}
                    >
                      Delete
                    </button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default DataTable;
