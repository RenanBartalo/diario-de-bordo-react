import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';

import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';

import MyTravels from './components/pages/MyTravels.jsx/MyTravels';
import TravelDetails from './components/pages/TravelDetails/TravelDetails';

import DayDetails from './components/pages/DayDetails/DayDetails';

import Social from './components/pages/Social/Social';
import User from './components/pages/User/User';

import ProtectedRoute from './components/miscelaneous/ProtectedRoute/ProtectedRoute';

import { getTravels } from './services/api';

const App = () => {
  const [projects, setProjects] = useState([]);
  const searchTitle = '';
  const [user, setUser] = useState({
    name: '',
    roteiros: '0',
  });

  const getProjectsByTitle = async () => {
    try {
      const token = localStorage.getItem('token');
      const foundProjects = await getTravels(searchTitle, token);
      setProjects(foundProjects.travels);
      const userX = foundProjects.user.name;
      const roteirosX = foundProjects.travels.length;
      setUser({ ...user, name: userX, roteiros: roteirosX });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProjectsByTitle();
  }, [searchTitle]);
  const verifyLoggedUser = () => {
    const token = localStorage.getItem('token');

    return !!token;
  };

  const [isUserLogged, setIsUserLogged] = useState(verifyLoggedUser());

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
            projects={projects}
          />
)}
      />

      <Route
        path="/social"
        element={(
          <ProtectedRoute
            isLogged={isUserLogged}
            Page={Social}
            user={user}
          />
)}
      />

      <Route
        path="/my-travels/:travelId"
        element={<ProtectedRoute isLogged={isUserLogged} Page={TravelDetails} user={user} />}
      />
      <Route
        path="/detail/:dayId"
        element={<ProtectedRoute isLogged={isUserLogged} Page={DayDetails} user={user} />}
      />
      <Route
        path="/user/:userId"
        element={<ProtectedRoute isLogged={isUserLogged} Page={User} user={user} />}
      />
    </Routes>
  );
};

export default App;
