import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignIn = async () => {
        try {
            localStorage.clear();
            console.log("Login attempt with email:", email, "and password:", password);
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, {
                email,
                password,
            });

            console.log("Login response:", res.data);
            if (res.data.msg === 'Login successful') {
                console.log("Login response:", res.data);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                navigate('/home');

            } else {
                alert(res.data.msg);
            }
        } catch (err) {
            alert(err.response?.data?.msg || 'Login failed');
        }
    };

    const handleAdmin = async () => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, {
                email,
                password,
            });

            if (res.data.msg === 'Login successful' && email === 'admin@example.com') {
                // ✅ Save admin user data too
                localStorage.setItem("user", JSON.stringify(res.data.user));
                navigate('/admin');
            } else {
                alert('Access denied or invalid credentials');
            }
        } catch (err) {
            alert(err.response?.data?.msg || 'Admin login failed');
        }
    };

    const handleSignUp = () => {
        navigate('/signup');
    };

    return (
        <div className="container-fluid vh-100 d-flex p-0">
            {/* Left side image */}
            <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center p-0">
                <img
                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
                    alt="side"
                    className="img-fluid h-100 w-100"
                    style={{ objectFit: 'cover' }}
                />
            </div>

            {/* Right side form */}
            <div className="col-12 col-md-6 d-flex align-items-center justify-content-center z-3">
                <img
                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
                    alt="bg"
                    className="position-absolute top-0 start-0 w-100 h-100 d-md-none"
                    style={{ objectFit: 'cover', filter: 'blur(8px)' }}
                />
                <div className="position-absolute top-0 start-0 w-100 h-100 d-md-none"
                    style={{ backgroundColor: 'rgba(255,255,255,0.6)' }}></div>

                <div className="w-75 z-2">
                    <h3 className="mb-4">Log in to your account</h3>
                    <p className="mb-4 text-muted">Welcome back! Please enter your details.</p>

                    <form>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button type="button" className="btn btn-warning w-100" onClick={handleSignIn}>
                            Login
                        </button>
                        <br />
                        <button type="button" className="btn btn-warning w-100 mt-2" onClick={handleAdmin}>
                            Admin
                        </button>

                        <p className="mt-3 text-center">
                            Don't have an account?{' '}
                            <button type="button" onClick={handleSignUp} className="btn btn-link text-warning p-0">
                                Register Now
                            </button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
