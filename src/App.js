import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <Routes>
      {!isLoggedIn && <Route path="/" element={<Login />} />}
      {isLoggedIn && <Route path='/' element={<Login />} />}
    </Routes>
  );
}

export default App;
