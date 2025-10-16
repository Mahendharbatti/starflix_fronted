import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../Styles/Header.css';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Header = () => {
     const [user, setUser] = useState({ profile_image: '' });
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const fetchProfile = async () => {
        try {
            const response = await axios.get('https://starflix-backend-x0qc.onrender.com/api/profile/', {
                headers: { Authorization: `Token ${token}` }
            });
            setUser(response.data);
        } catch (error) {
            console.error('Profile fetch failed', error.response?.data || error.message);
            if (error.response?.status === 401) {
                localStorage.removeItem('token');
                navigate('/login');
            }
        }
    };

    useEffect(() => {
    if (token) fetchProfile();
    else navigate('/login');

    // Custom event listener
    const handleProfileUpdated = () => {
        fetchProfile();
    };

    window.addEventListener('profileUpdated', handleProfileUpdated);

    return () => {
        window.removeEventListener('profileUpdated', handleProfileUpdated);
    };
}, [token, navigate]);


    return (
        <header className="sticky-navbar">
            <Navbar expand="lg" className="navbar custom-navbar">
                <Container>
                    <Navbar.Brand href="/home">
                        <img src="/images/logo.png" alt="logo" width="150px" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav">
                        <span className="custom-toggler-bar"></span>
                        <span className="custom-toggler-bar"></span>
                        <span className="custom-toggler-bar"></span>
                    </Navbar.Toggle>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="/home">HOME</Nav.Link>
                            <Nav.Link href="/movies">MOVIES</Nav.Link>
                            <Nav.Link href="/tvshows">TV SHOWS</Nav.Link>
                            <Nav.Link href="/popular">NEW & POPULAR</Nav.Link>
                            <Nav.Link href="/profile">
                                <img
                                    src={user.profile_image || '/images/person.png'}
                                    alt="Profile"
                                    style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                                />
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
