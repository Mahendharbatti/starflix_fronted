import axios from 'axios';
import '../Styles/login.css'
import '../Styles/common.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Login({ setToken }) {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/login/', credentials, {
                headers: { 'Content-Type': 'application/json' }
            });
            localStorage.setItem('token', response.data.token);
            setToken(response.data.token);
            navigate('/home');
        } catch (error) {
            console.error('Login failed', error.response ? error.response.data : error.message);
            alert('Login failed: ' + (error.response ? error.response.data.error : 'Connection issue'));
        }
    };

    return (
        <div>
            {/* <!--Banner Section--> */}
            <section className="banner" style={{ backgroundImage: "url('/images/banner.png')" }}>

                <div className="banner-content">
                    <img src="/images/logo.png" alt="logo" width="200px" />
                    <h1>Unlimited streaming of</h1>
                    <h1 className='banner-head'>movies, series, and more.</h1>
                    <p>All your favorites in one place. Start watching now.</p>

                    {/* <!-- Button trigger modal --> */}
                    <a href='' className="btn-login" data-bs-toggle="modal" data-bs-target="#loginModal">
                        <b> LOGIN</b>
                    </a>

                    {/* <!-- Modal --> */}
                    <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header border-0">
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <h3>LOGIN</h3>
                                    <form id="loginForm" onSubmit={handleSubmit} >
                                        <div className="mb-3">
                                            <label>USERNAME:</label>
                                            <input type="text" className="form-control" id="email" placeholder="Email" value={credentials.username}
                                                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                                                required />
                                        </div>
                                        <div className="mb-3">
                                            <label>PASSWORD:</label>
                                            <input type="password" placeholder="password" className="form-control" id="password" value={credentials.password}
                                                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} required />

                                        </div>
                                        <br />
                                        <button type="submit" className="btn  w-100" data-bs-dismiss="modal"><b>LOGIN</b></button>
                                    </form>
                                </div>
                                <div className="modal-footer justify-content-center border-0">
                                    <small>
                                        <a href="/signup">Sign up</a> • 
                                        {/* <a href="#">Forgot password?</a> */}
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </section>

        </div>
    );
}

export default Login