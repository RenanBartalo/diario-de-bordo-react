import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';

import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';

import MyProjects from './components/pages/MyProjects/MyProjects';
import ProjectDetails from './components/pages/ProjectDetails/ProjectDetails';

import NavBar from './components/NavBar/NavBar';
import TemplatePrivate from './components/templates/TemplatePrivate/TemplatePrivate';

import ProtectedRoute from './components/miscelaneous/ProtectedRoute/ProtectedRoute';

const App = () => {
  const verifyLoggedUser = () => {
    const token = localStorage.getItem('token');

    return !!token;
  };

  const [isUserLogged, setIsUserLogged] = useState(verifyLoggedUser());

  const [user, setUser] = useState({
    name: '',
    roteiros: 0,
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
            Page={MyProjects}
            setUser={setUser}
            user={user}
          />
)}
      />

      <Route
        path="/my-travels/:travelId"
        element={<ProtectedRoute isLogged={isUserLogged} Page={ProjectDetails} user={user} />}
      />
    </Routes>
  );
};

export default App;
