import React, { useEffect, useState } from "react";
import "./Header.css";
import Avatar from "@mui/material/Avatar";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Header({ displayed }) {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const getUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/getUser/${localStorage.tn}`
      );
      console.log("response of get user", response);
      response.data && setUser(response.data.user)
    } catch (error) {
      console.error("error in get user", error);
    }
  };

  useEffect(() => {
    getUser()
  }, [])


  // change pass
  const changePassword = async () => {
    setLoading(true)
    try {
      const response = await axios.post("http://localhost:5000/api/changePass", {
        oldPass: oldPassword,
        newPass: newPassword,
        id: localStorage.tn
      })
      console.log("response of change pass", response);
      
      response.data && setSuccessMsg(response.data.msg)
      response.data && setErrorMsg("")
    } catch (error) {
      console.error("error in change password", error)
      setErrorMsg(error.response.data.msg || "something error")
      setSuccessMsg("")
    }finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-header">
      <div className="admin-welcome-section">
        <div className="admin-welcome-text">
          <h2>Hello {user?.fname} {user?.lname}!</h2>
          <p>Welcome to the dashboard!</p>
          <p className="admin-subtitle">
            Track your progress and manage your tasks
          </p>
          {displayed && (
            <div style={{ display: "flex", gap: "5px" }}>
              <button
                className="btn btn-warning mt-3"
                onClick={() => setActive((prevState) => !prevState)}
              >
                {active ? "close" : "change"} my password
              </button>
            </div>
          )}
          {/* active change my password */}
          {active === true ? (
            <div>
              <div>
                <input
                  placeholder="old password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  type="password"
                  className="mt-4"
                  style={{ width: "350px" }}
                />
              </div>
              <div>
                <input
                  placeholder="new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  type="password"
                  className="mt-4"
                  style={{ width: "350px" }}
                />
              </div>
              {successMsg && (
              <h5
                style={{
                  backgroundColor: "#66CD56",
                  color: "white",
                  textAlign: "center",
                  padding: "10px 15px",
                  width: "70%",
                  borderRadius: "8px",
                  marginTop: "10px"
                }}
              >
                {successMsg}
              </h5>
            )}
            {errorMsg && (
              <h5
                style={{
                  backgroundColor: "#c94d50",
                  color: "white",
                  textAlign: "center",
                  padding: "10px 15px",
                  width: "70%",
                  borderRadius: "8px",
                  marginTop: "10px"
                }}
              >
                {errorMsg}
              </h5>
            )}
              <div>
                <button className="mt-4 btn btn-success" onClick={changePassword}>{loading ? "loading...." : "change"}</button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <div className="admin-header-right">
        <div className="admin-notification-icon">
          <NotificationsIcon />
        </div>
        <div className="admin-user-profile">
          <Avatar className="admin-avatar">HF</Avatar>
        </div>
      </div>
    </div>
  );
}

export default Header;
