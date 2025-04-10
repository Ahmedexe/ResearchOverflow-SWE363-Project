import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();

    const handleSignIn = () => {
        navigate('/home');
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
            < div className="col-12 col-md-6 d-flex align-items-center justify-content-center z-3" >
                {/*Mobile Background Image*/}
                <img
                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
                    alt="bg"
                    className="position-absolute top-0 start-0 w-100 h-100 d-md-none"
                    style={{ objectFit: 'cover', filter: 'blur(8px)' }}
                />

                {/* White Overlay */}
                <div className="position-absolute top-0 start-0 w-100 h-100 d-md-none"
                    style={{ backgroundColor: 'rgba(255,255,255,0.6)' }}>
                </div>
                <div className="w-75 z-2">
                    <h3 className="mb-4">Log in to your account</h3>
                    <p className="mb-4 text-muted">Welcome back! Please enter your details.</p>

                    <form>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" placeholder="name@example.com" />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" placeholder="Password" />
                        </div>



                        <button type="button" className="btn btn-warning w-100" onClick={handleSignIn}>
                            Login
                        </button>

                        <p className="mt-3 text-center">
                            Don't have an account?{' '}
                            <button type="button" onClick={handleSignUp} className="btn btn-link text-warning p-0">
                                Register Now
                            </button>
                        </p>
                    </form>
                </div>
            </div >
        </div >
    );
}
