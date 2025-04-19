import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "./Profile.css";

export default function Profile() {
    return (
        <div className="page-container">
            <Navbar />
            <div className="body-container">
                <Sidebar />
                <div className="main-content">
                <h1>Profile</h1>
                    <div className="profile-header">
                        <div className="avatar-container">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNQ6ZmsiCzSC16bStr1KjZNcIBW5hAMa1ek6xoNeSSw5wQouq_N7dQCxlxI02TIeZk1e0&usqp=CAU"></img>
                        </div>
                    </div>

                    <div className="settings-card">
                        <h2>Personal Information</h2>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>First Name</label>
                                <div className="value-box">Doe</div>
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <div className="value-box">Jane</div>
                            </div>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <div className="value-box">+1 234 567 890</div>
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <div className="value-box">jane.doe@example.com</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
