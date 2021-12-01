import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';

import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';

import MyTravels from './components/pages/MyTravels.jsx/MyTravels';
import TravelDetails from './components/pages/TravelDetails/TravelDetails';

import ProtectedRoute from './components/miscelaneous/ProtectedRoute/ProtectedRoute';

const App = () => {
  const verifyLoggedUser = () => {
    const token = localStorage.getItem('token');

    return !!token;
  };

  const [isUserLogged, setIsUserLogged] = useState(verifyLoggedUser());

  const [user, setUser] = useState({
    name: '',
    roteiros: '0',
  });

  const loginUser = () => {
    setIsUserLogged(true);
  };

  return (
    <Routes>
      <Route path="/" element={<Login loginUser={loginUser} />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/my-travels"
        element={(
          <ProtectedRoute
            isLogged={isUserLogged}
            Page={MyTravels}
            setUser={setUser}
            user={user}
          />
)}
      />

      <Route
        path="/my-travels/:travelId"
        element={<ProtectedRoute isLogged={isUserLogged} Page={TravelDetails} user={user} />}
      />
    </Routes>
  );
};

export default App;
