import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './layouts/header-footer/Navbar';
import Footer from './layouts/header-footer/Footer';
import HomePage from './layouts/homepage/HomePage';
import { layToanBoSach } from './api/SachApi';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './layouts/about/About';
import ChiTietSanPham from './layouts/product/ChiTietSanPham';
import DangKyNguoiDung from './user/DangKyNguoiDung';
import ThemTheLoai from './add/ThemTheLoai';
import ThemHinhThucGiaoHang from './add/ThemHinhThucGiaoHang';
import ThemHinhThucThanhToan from './add/ThemHinhThucThanhToan';
import ThemSach from './add/ThemSach';

function App() {
  const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState('');
  return (


    <div className="App">
      <BrowserRouter>
        {/* thanh điiều hướng (menu) navbar */}
        <Navbar
          tuKhoaTimKiem={tuKhoaTimKiem}
          setTuKhoaTimKiem={setTuKhoaTimKiem}
        />
        <Routes>
          <Route path='/' element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />}></Route>
          <Route path='/:maTheLoai' element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />}></Route>
          <Route path='/sach/:maSach' element={<ChiTietSanPham />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/dangKy' element={<DangKyNguoiDung />}></Route>
          <Route path='/themTheLoai' element={<ThemTheLoai />}></Route>
          <Route path='/themHinhThucGiaoHang' element={<ThemHinhThucGiaoHang />}></Route>
          <Route path='/themHinhThucThanhToan' element={<ThemHinhThucThanhToan />}></Route>
          <Route path='/themSach' element={<ThemSach />}></Route>

        </Routes>
        {/* //chân trang (footer) */}
        <Footer />
      </BrowserRouter>
    </div>

  );
}

export default App;
