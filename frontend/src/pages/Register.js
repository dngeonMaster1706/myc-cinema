import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../axiosConfig';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/register', { name, email, password });
      alert('Registration Successful! Please login.');
      navigate('/login');
    } catch (err) {
      alert('Registration Failed');
      console.log(err);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="card shadow-lg p-4" style={{ width: '400px', borderRadius: '15px', borderTop: '5px solid #007BFF' }}>
        <h3 className="text-primary mb-4 text-center">Register</h3>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            className="form-control rounded-pill mb-3"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            className="form-control rounded-pill mb-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="form-control rounded-pill mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary w-100 rounded-pill shadow-sm">
            Register
          </button>
        </form>

        {/* Redirect to Login */}
        <p className="mt-3 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-primary fw-bold" style={{ textDecoration: 'none' }}>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
