import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './layouts/header-footer/Navbar';
import Footer from './layouts/Footer';

function App() {
  return (
    <div className="App">

      {/* thanh điiều hướng (menu) navbar */}
      <Navbar />

      {/* //chân trang (footer) */}
      <Footer />

    </div>

  );
}

export default App;
