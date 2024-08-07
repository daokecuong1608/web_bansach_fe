import React, { useState } from 'react';
import './design/ThemTheLoai.css';

const ThemTheLoai = () => {
    const [tenTheLoai, setTenTheLoai] = useState('');
    const [error, setError] = useState('');
    const [thongBao, setThongBao] = useState('');
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        //clear lỗi
        setError('');

        //tránh click liên tuccj
        e.preventDefault();

        //kiểm tra dữ liệu
        const isTentheLoaiValid = !await kiemTraTenTheLoaiTontai(tenTheLoai);

        if (isTentheLoaiValid) {
            try {
                const url = 'http://localhost:8080/api/them-the-loai';
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        tenTheLoai: tenTheLoai,
                    })
                }
                )
                if (response.ok) {
                    setThongBao('Thêm  thành công');
                } else {
                    setThongBao('Thêm thất bại');
                }
            } catch (error) {
                console.log("error", error);

            }
        }
    }

    const kiemTraTenTheLoaiTontai = async (tenTheLoai: string) => {
        const url = `http://localhost:8080/the-loai/search/existsByTenTheLoai?tenTheLoai=${tenTheLoai}`
        //call api
        try {
            const response = await fetch(url);
            const data = await response.text();
            if (data === "true") {
                setError('Tên thể loại  đã tồn tại');
                return true;
            }
            return false;
        } catch (error) {
            console.log("error", error);
            return false;
        }

    }

    const handleTenTheLoaiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTenTheLoai(e.target.value);
        setError('');
        return kiemTraTenTheLoaiTontai(e.target.value);
    }

    return (
        <div className="container">
            <h1>Thêm thể loại</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="ten">Tên thể loại</label>
                    <input type="text"
                        className="form-control"
                        id="ten"
                        value={tenTheLoai}
                        onChange={handleTenTheLoaiChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Thêm thể loại </button>
                <div style={{ color: "green" }}>{thongBao}</div>

            </form>
        </div>
    );
};

export default ThemTheLoai;
