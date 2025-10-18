import React, { useState } from 'react';
import '../Styles/signup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        fname: '',
        lastname: '',
        country: '',
        state: '',
        password: '',
        confirm_password: ''
    });

    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
        const response = await axios.post('https://starflix-backend-x0qc.onrender.com/api/register/', formData, {
            headers: { 'Content-Type': 'application/json' }
        });

        alert('Registration successful!'); // ✅ Show popup
        navigate('/login');
    } catch (err) {
        console.error(err);
        setError(err.response?.data?.error || 'Registration failed');
    }
};

    
    return (
        <div>
            <section className='profilepage'>
                <div className="form-container">
                    <div className='sign-logo' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
                        <img src="/images/logo.png" alt="logo" width='180px' />
                    </div>
                    <h4>SIGN UP</h4>

                    {error && <div style={{ background: '#e53e3e', padding: '10px', color: '#fff', marginBottom: '15px' }}>{error}</div>}
                    {message && <div style={{ background: '#38a169', padding: '10px', color: '#fff', marginBottom: '15px' }}>{message}</div>}

                    <form className='userform signup-form' onSubmit={handleSubmit}>
                        <div className='sign-group'>
                            <label>Username</label>
                            <input type="text" name='username' placeholder="Username" value={formData.username} onChange={handleChange} required />
                        </div>
                        <div className='sign-group'>
                            <label>Email address</label>
                            <input type="email" name='email' placeholder="Email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className='sign-group'>
                            <label>First name</label>
                            <input type="text" name='fname' placeholder="First Name" value={formData.fname} onChange={handleChange} required />
                        </div>
                        <div className='sign-group'>
                            <label>Last name</label>
                            <input type="text" name='lastname' placeholder="Last Name" value={formData.lastname} onChange={handleChange} required />
                        </div>
                        <div className='sign-group'>
                            <label>Country</label>
                            <input type="text" name='country' placeholder="Country" value={formData.country} onChange={handleChange} required />
                        </div>
                        <div className='sign-group'>
                            <label>State</label>
                            <input type="text" name='state' placeholder="State" value={formData.state} onChange={handleChange} required />
                        </div>
                        <div className='sign-group'>
                            <label>Password</label>
                            <input type="password" name='password' placeholder="Enter password" value={formData.password} onChange={handleChange} required />
                        </div>
                        <div className='sign-group'>
                            <label>Confirm Password</label>
                            <input type="password" name='confirm_password' placeholder="Again enter password" value={formData.confirm_password} onChange={handleChange} required />
                        </div>
                        <button type="submit">SIGN UP</button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Signup;
