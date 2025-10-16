import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { FaAngleRight } from 'react-icons/fa'
import '../Styles/profile.css'

function Profile() {
    const [user, setUser] = useState({
        username: '',
        email: '',
        fname: '',
        lastname: '',
        country: '',
        state: '',
        profile_image: ''
    });
    const [passwordData, setPasswordData] = useState({
        old_password: '',
        new_password: '',
        confirm_password: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
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
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchProfile();
        } else {
            navigate('/login');
        }
    }, [token, navigate]);



    const handleSave = async (e) => {
    e.preventDefault();
    try {
        setLoading(true);
        setMessage('');
        setError('');

        const formData = new FormData();
        formData.append('username', user.username);
        formData.append('email', user.email);
        formData.append('fname', user.fname);
        formData.append('lastname', user.lastname);
        formData.append('country', user.country);
        formData.append('state', user.state);

        if (user.profile_image instanceof File) {
            formData.append('profile_image', user.profile_image);
        }

        const response = await axios.put(
            'https://starflix-backend-x0qc.onrender.com/api/profile/',
            formData,
            {
                headers: {
                    Authorization: `Token ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            }
        );

        setUser(response.data);
        setMessage('Profile updated successfully!');
        window.dispatchEvent(new Event('profileUpdated'));


        // Trigger a localStorage event to inform Header
        localStorage.setItem('profile_updated', Date.now().toString());

    } catch (error) {
        console.error('Save failed', error.response?.data || error.message);
        setError(error.response?.data?.error || 'Failed to update profile');
    } finally {
        setLoading(false);
    }
};

    const handlePasswordChange = async () => {
        try {
            setLoading(true);
            setMessage('');
            setError('');

            await axios.post('https://starflix-backend-x0qc.onrender.com/api/change-password/',
                passwordData,
                {
                    headers: { Authorization: `Token ${token}` }
                }
            );

            setPasswordData({
                old_password: '',
                new_password: '',
                confirm_password: ''
            });
            setMessage('Password changed successfully!');
        } catch (error) {
            console.error('Password change failed', error.response?.data || error.message);
            setError(error.response?.data?.error || 'Failed to change password');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    if (loading) {
        return (
            <div>
            <Header/>
            <div style={{ minHeight: '100vh', backgroundColor: '#1a202c', color: 'white', padding: '20px', display:'flex', justifyContent:'center', alignItems:'center' }}>
                <p>Loading...</p>
            </div>
            <Footer/>
            </div>
        );
    }




    return (
        <div>
            <Header />
            <section className='profilepage'>

                <div className='moviesheading'>
                    <h1>PROFILE</h1>
                    <p><a href="/home">HOME</a> <span> <FaAngleRight /> </span> PROFILE</p>
                </div>

                {message && (
                    <div style={{ backgroundColor: '#38a169', padding: '10px', borderRadius: '4px', marginBottom: '20px' }}>
                        {message}
                    </div>
                )}

                {error && (
                    <div style={{ backgroundColor: '#e53e3e', padding: '10px', borderRadius: '4px', marginBottom: '20px' }}>
                        {error}
                    </div>
                )}

                <div className='profile-text'>
                    <div className='img-text'>
                        <div className='profile-img'>
                            {user.profile_image ? (
                                <img
                                    src={user.profile_image}
                                    alt="Profile"
                                    style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', marginRight: '20px' }}
                                />
                            ) : (
                                <img
                                    src='/images/person.png'
                                    alt="Profile"
                                    style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', marginRight: '20px' }}
                                />

                            )}


                            < form action="" method="post" onSubmit={handleSave}>
                                <input type="file" name="userimg" id="userimg" onChange={(e) => setUser({ ...user, profile_image: e.target.files[0] })}
                                    accept="image/png, image/jpeg, image/gif" hidden />

                                <label htmlFor="userimg" className="custom-upload-btn">
                                    change profile
                                </label>
                                <button className="custom-upload-btn" type='submit'>Save</button>
                            </form>
                        </div>

                        <div className='acc-dtl'>
                            <h6>Account Details</h6>
                            <a href="#change-password">CHANGE PASSWORD</a>
                            <a className='logout' onClick={handleLogout}>LOG OUT</a>
                        </div>

                    </div>

                    <div className="form-container">
                        <h4> 01. PROFILE DETAILS</h4>
                        <form className='userform' action='' method='post' onSubmit={handleSave}>
                            <div className="form-group">
                                <label>Username</label>
                                <input type="text" name='username' placeholder="Username" value={user.username}
                                    onChange={(e) => setUser({ ...user, username: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>email address</label>
                                <input type="email" name='email' placeholder="Email" value={user.email}
                                    onChange={(e) => setUser({ ...user, email: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>first name</label>
                                <input type="text" name='fname' placeholder="First Name" value={user.fname || ''}
                                    onChange={(e) => setUser({ ...user, fname: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>last name</label>
                                <input type="text" name='lname' placeholder="Last Name" value={user.lastname || ''}
                                    onChange={(e) => setUser({ ...user, lastname: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>country</label>
                                <input type="text" name='country' placeholder="Country" value={user.country || ''}
                                    onChange={(e) => setUser({ ...user, country: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>state</label>
                                <input type="text" name='state' placeholder="State" value={user.state || ''}
                                    onChange={(e) => setUser({ ...user, state: e.target.value })} />
                            </div>
                            <button type="submit">SAVE</button>
                        </form>
                        <br />
                        <hr />
                        <br />
                        <h4 id='change-password'> 02. CHANGE PASSWORD</h4>
                        <form className='usr-psd' action='' method='post' onSubmit={handlePasswordChange}>
                            <div className="form-group">
                                <label>Old Password</label>
                                <input type="password" placeholder="enter old password" value={passwordData.old_password}
                                    onChange={(e) => setPasswordData({ ...passwordData, old_password: e.target.value })} />
                                <br />
                                <label>New password</label>
                                <input type="password" placeholder="enter new password" value={passwordData.new_password}
                                    onChange={(e) => setPasswordData({ ...passwordData, new_password: e.target.value })} />
                                <br />
                                <label>confirm new password</label>
                                <input type="password" placeholder="enter old password" value={passwordData.confirm_password}
                                    onChange={(e) => setPasswordData({ ...passwordData, confirm_password: e.target.value })} />
                            </div>
                            <button type="submit">Change</button>
                        </form>


                    </div>
                </div>

            </section >
            <Footer />
        </div >
    )
}

export default Profile