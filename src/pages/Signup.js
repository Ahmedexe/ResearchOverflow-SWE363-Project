import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  // const [role, setRole] = useState('Educator');

  const handleSignup = () => {
    navigate('/home');
  };

  return (
    <div className="container-fluid vh-100 d-flex flex-wrap p-0">

      {/* Left Image (Desktop only) */}
      <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center p-0">
        <img
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
          alt="side"
          className="img-fluid h-100 w-100"
          style={{ objectFit: 'cover' }}
        />
      </div>

      {/* Right Side */}
      <div className="col-12 col-md-6 d-flex align-items-center justify-content-center position-relative">

        {/* Mobile Background */}
        <img
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
          alt="bg"
          className="position-absolute top-0 start-0 w-100 h-100 d-md-none"
          style={{ objectFit: 'cover', filter: 'blur(5px)' }}
        />

        <div className="position-absolute top-0 start-0 w-100 h-100 d-md-none"
             style={{ backgroundColor: 'rgba(255,255,255,0.6)' }}></div>

        {/* Content */}
        <div className="w-75 position-relative">
          <h3 className="mb-4 ">Register to your new account</h3>
          <p className="mb-4">Please enter your details.</p>

            
          {/*   {/* Role Selection 
          <div className="mb-3 d-flex gap-2">
            <button type="button" className={`btn ${role === 'Educator' ? 'btn-warning' : 'btn-light'}`}
                    onClick={() => setRole('Educator')}>
              Educator
            </button>
            <button type="button" className={`btn ${role === 'Researcher' ? 'btn-warning' : 'btn-light'}`}
                    onClick={() => setRole('Researcher')}>
              Researcher
            </button>
          </div> 
          */}

          {/* Form */}
          <form>
            <div className="mb-3">
              <input type="text" placeholder="First Name" className="form-control" />
            </div>

            <div className="mb-3">
              <input type="text" placeholder="Last Name" className="form-control" />
            </div>

            <div className="mb-3">
              <input type="email" placeholder="Email" className="form-control" />
            </div>

            <div className="mb-3">
              <input type="password" placeholder="Password" className="form-control" />
            </div>

            <button type="button" className="btn btn-warning w-100" onClick={handleSignup}>
              Register
            </button>

            <p className="mt-3 text-center">
              Do have an account?{' '}
              <span onClick={() => navigate('/login')} className="text-warning" style={{ cursor: 'pointer' }}>
                Login Now
              </span>
            </p>
          </form>
        </div>

      </div>
    </div>
  );
}
