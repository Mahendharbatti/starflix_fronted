import axios from 'axios';
import '../Styles/login.css';
import '../Styles/common.css';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Modal } from 'bootstrap';

function Login({ setToken }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://starflix-backend-x0qc.onrender.com/api/login/',
        credentials,
        { headers: { 'Content-Type': 'application/json' } }
      );

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
      {/* Banner Section */}
      <section className="banner" style={{ backgroundImage: "url('/images/banner.png')" }}>
        <div className="banner-content">
          <img src="/images/logo.png" alt="logo" width="200px" />
          <h1>Unlimited streaming of</h1>
          <h1 className="banner-head">movies, series, and more.</h1>
          <p>All your favorites in one place. Start watching now.</p>

          {/* Login Button */}
          <a
            href=""
            className="btn-login"
            data-bs-toggle="modal"
            data-bs-target="#loginModal"
          >
            <b>LOGIN</b>
          </a>

          {/* Login Modal */}
          <div
            className="modal fade"
            id="loginModal"
            tabIndex="-1"
            aria-labelledby="loginModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header border-0">
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <h3>LOGIN</h3>
                  <form id="loginForm" onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label>USERNAME:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        placeholder="Email"
                        value={credentials.username}
                        onChange={(e) =>
                          setCredentials({ ...credentials, username: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label>PASSWORD:</label>
                      <input
                        type="password"
                        placeholder="password"
                        className="form-control"
                        id="password"
                        value={credentials.password}
                        onChange={(e) =>
                          setCredentials({ ...credentials, password: e.target.value })
                        }
                        required
                      />
                    </div>
                    <br />
                    <button
                      type="submit"
                      className="btn w-100"
                      data-bs-dismiss="modal"
                    >
                      <b>LOGIN</b>
                    </button>
                  </form>
                </div>

                <div className="modal-footer justify-content-center border-0">
                  <small>
                    <Link
                      to="/signup"
                      onClick={(e) => {
                        e.preventDefault(); // prevent immediate navigation
                        const modalElement = document.getElementById('loginModal');
                        const modalInstance =
                          Modal.getInstance(modalElement) || new Modal(modalElement);

                        if (modalInstance) modalInstance.hide();

                        // Wait for the closing animation to finish
                        setTimeout(() => {
                          document
                            .querySelectorAll('.modal-backdrop')
                            .forEach((el) => el.remove());
                          document.body.classList.remove('modal-open');
                          document.body.style = '';
                          navigate('/signup'); // navigate after modal closes
                        }, 300);
                      }}
                    >
                      Sign up
                    </Link>
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

export default Login;
