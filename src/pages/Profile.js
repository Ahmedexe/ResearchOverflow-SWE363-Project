import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "./Profile.css";

export default function Profile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          // Optional fallback: redirect or show error
          setUser(null);
        }
      }, []);
      

    if (!user) {
        return <p>Loading profile...</p>;
    }

    return (
        <div className="page-container">
            <Navbar />
            <div className="body-container">
                <Sidebar />
                <div className="main-content">
                    <h1>Profile</h1>

                    <div className="profile-header">
                        <div className="avatar-container">
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNQ6ZmsiCzSC16bStr1KjZNcIBW5hAMa1ek6xoNeSSw5wQouq_N7dQCxlxI02TIeZk1e0&usqp=CAU"
                                alt="Avatar"
                            />
                        </div>
                    </div>

                    <div className="settings-card">
                        <h2>Personal Information</h2>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>First Name</label>
                                <div className="value-box">{user.fname}</div>
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <div className="value-box">{user.lname}</div>
                            </div>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <div className="value-box">+966 5X XXX XXXX</div>
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <div className="value-box">{user.email}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
