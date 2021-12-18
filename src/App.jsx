/* eslint-disable consistent-return */
/* eslint-disable no-console */
import React, { useState } from 'react';
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
  const verifyLoggedUser = () => {
    const token = localStorage.getItem('token');

    return !!token;
  };

  const [isUserLogged, setIsUserLogged] = useState(verifyLoggedUser());

  const loginUser = () => {
    setIsUserLogged(true);
  };
  const [projects, setProjects] = useState([]);
  const [update, setUpdate] = useState(false);
  const searchTitle = '';

  const [user, setUser] = useState({
    name: '',
    roteiros: '0',
    photo: '',
    userId: '',
    email: '',
  });
  const getProjectsByTitle = async () => {
    try {
      const token = localStorage.getItem('token');
      const foundProjects = await getTravels(searchTitle, token);
      setProjects(foundProjects.travels);
      const userX = foundProjects.user.name;
      const roteirosX = foundProjects.travels.length;
      const photoX = foundProjects.user.photo;
      const userIdX = foundProjects.user._id;
      const emailX = foundProjects.user.email;
      setUser({
        ...user,
        name: userX,
        roteiros: roteirosX,
        photo: photoX,
        userId: userIdX,
        email: emailX,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Routes>
      <Route path="/" element={<Login loginUser={loginUser} />} />
      <Route path="/register" element={<Register loginUser={loginUser} />} />

      <Route
        path="/my-travels"
        element={(
          <ProtectedRoute
            isLogged={isUserLogged}
            Page={MyTravels}
            setUser={setUser}
            getProjectsByTitle={getProjectsByTitle}
            user={user}
            projects={projects}
            setUpdate={setUpdate}
            update={update}
          />
        )}
      />

      <Route
        path="/social"
        element={(
          <ProtectedRoute
            isLogged={isUserLogged}
            getProjectsByTitle={getProjectsByTitle}
            Page={Social}
            user={user}
          />
        )}
      />

      <Route
        path="/my-travels/:travelId"
        element={(
          <ProtectedRoute
            isLogged={isUserLogged}
            Page={TravelDetails}
            user={user}
            getProjectsByTitle={getProjectsByTitle}
            setUpdate={setUpdate}
            update={update}
          />
        )}
      />
      <Route
        path="/detail/:dayId"
        element={(
          <ProtectedRoute
            isLogged={isUserLogged}
            Page={DayDetails}
            getProjectsByTitle={getProjectsByTitle}
            user={user}
            setUpdate={setUpdate}
            update={update}
          />
        )}
      />
      <Route
        path="/user/:userId"
        element={(
          <ProtectedRoute
            isLogged={isUserLogged}
            getProjectsByTitle={getProjectsByTitle}
            Page={User}
            user={user}
          />
        )}
      />
    </Routes>
  );
};

export default App;
