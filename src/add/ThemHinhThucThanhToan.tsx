import React, { useState } from "react";

const ThemHinhThucThanhToan = () => {
    const [tenHinhThucThanhToan, setTenHinhThucThanhToan] = useState('');
    const [giaHinhThucThanhToan, setGiaHinhThucThanhToan] = useState(0);
    const [moTa, setMoTa] = useState('');
    const [baoLoiTen, setBaoLoiTen] = useState('');
    const [thongBao, setThongBao] = useState('');

    const handlThemHinhThuc = async (e: React.FormEvent<HTMLFormElement>) => {

        setBaoLoiTen('');
        e.preventDefault();
        const isTenHinhThucThanhToanValid = !await kiemTraTenHinhThucThanhToanTonTai(tenHinhThucThanhToan);
        if (isTenHinhThucThanhToanValid) {
            try {
                const url = 'http://localhost:8080/api/them-hinh-thuc-thanh-toan';
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        tenHinhThucThanhToan: tenHinhThucThanhToan,
                        giaHinhThucThanhToan: giaHinhThucThanhToan,
                        moTa: moTa
                    })
                })
                if (response.ok) {
                    setThongBao('Thêm hình thức thanh toán thành công');
                } else {
                    setThongBao('Thêm hình thức thanh toán thất bại');
                }
            } catch (error) {
                console.log("error", error);
            }
        }

    }

    const kiemTraTenHinhThucThanhToanTonTai = async (tenHinhThucThanhToan: string) => {
        const url = `http://localhost:8080/hinh-thuc-thanh-toan/search/existsByTenHinhThucThanhToan?tenHinhThucThanhToan=${tenHinhThucThanhToan}`;

        try {
            const response = await fetch(url);
            const data = await response.text();
            if (data === "true") {
                setBaoLoiTen('Tên hình thức thanh toán đã tồn tại');
                return true;
            }
            return false;
        } catch (error) {
            console.log("error", error);

        }

    }

    const handleTenHinhThucThanhToanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTenHinhThucThanhToan(e.target.value);
        setBaoLoiTen('');
        return kiemTraTenHinhThucThanhToanTonTai(e.target.value);

    }

    const handleGiaThanhToanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!Number.isNaN(parseInt(e.target.value))) {
            setGiaHinhThucThanhToan(parseInt(e.target.value));
            return false;
        }
        else {
            setGiaHinhThucThanhToan(0);
            return true;
        }
    }

    return (
        <div className="container">
            <h1>Thêm hình thức giao hàng </h1>
            <form onSubmit={handlThemHinhThuc} >
                <div className="form-group">

                    <label htmlFor="ten">Tên hình thức thanh toán</label>
                    <input type="text"
                        className="form-control"
                        id="ten"
                        value={tenHinhThucThanhToan}
                        onChange={handleTenHinhThucThanhToanChange}
                    />
                    <div style={{ color: "red" }}>{baoLoiTen}</div>


                    <label htmlFor="gia">Chi phí thanh toán</label>
                    <input type="number"
                        className="form-control"
                        id="gia"
                        value={giaHinhThucThanhToan}
                        onChange={handleGiaThanhToanChange}
                    />

                    <label htmlFor="mota">Mô tả </label>
                    <input type="text"
                        className="form-control"
                        id="mota"
                        value={moTa}
                        onChange={(e) => setMoTa(e.target.value)}
                    />

                    <button type="submit" className="btn btn-primary">Thêm hình thức giao hàng</button>
                    <div style={{ color: "green" }}>{thongBao}</div>
                </div>
            </form>
        </div>
    )

}
export default ThemHinhThucThanhToan;