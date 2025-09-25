import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../axiosConfig';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      alert('Login Successful');
      navigate('/home');
    } catch (err) {
      alert('Invalid credentials');
      console.log(err);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="card shadow-lg p-4" style={{ width: '400px', borderRadius: '15px', borderTop: '5px solid #007BFF' }}>
        <h3 className="text-primary mb-4 text-center">Login</h3>
        <form onSubmit={handleLogin}>
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
            Login
          </button>
        </form>

        {/* Redirect to Register */}
        <p className="mt-3 text-center">
          Not registered?{' '}
          <Link to="/register" className="text-primary fw-bold" style={{ textDecoration: 'none' }}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
