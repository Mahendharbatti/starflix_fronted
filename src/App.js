
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Home from './Pages/Home';
import MovieDetail from './Pages/MovieDetail';
import Movies from './Pages/Movies';
import Tvshows from './Pages/Tvshows';
import Newpopular from './Pages/Newpopular';
import Profile from './Pages/Profile';
import { useState, useEffect } from 'react';
import Signup from './Pages/Signup';

function App() {
   const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) setIsAuthenticated(true);
  }, [token]);


  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login setToken={setToken} />}>
          </Route>

          <Route path='/home' element={  <Home />}>
          </Route>
          
          <Route path='/movies' element={ <Movies />}>
          </Route>

          <Route path='/movies/:slug' element={ <MovieDetail  />}>
          </Route>

          <Route path='/tvshows' element={ <Tvshows />}>
          </Route>
          <Route path='/popular' element={ <Newpopular />}></Route>
          <Route path='/profile' element={ <Profile  /> }></Route>

          <Route path='/login/signup' element={ <Signup  /> }></Route>

          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>

    </div>

  );
}

export default App;
