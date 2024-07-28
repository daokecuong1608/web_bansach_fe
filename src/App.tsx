import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './layouts/header-footer/Navbar';
import Footer from './layouts/header-footer/Footer';
import HomePage from './layouts/homepage/HomePage';
import { layToanBoSach } from './api/SachApi';

function App() {
  const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState('');
  return (
    <div className="App">

      {/* thanh điiều hướng (menu) navbar */}
      <Navbar
        tuKhoaTimKiem={tuKhoaTimKiem}
        setTuKhoaTimKiem={setTuKhoaTimKiem}
      />

      <HomePage
        tuKhoaTimKiem={tuKhoaTimKiem}

      />

      {/* //chân trang (footer) */}
      <Footer />


    </div>

  );
}

export default App;
