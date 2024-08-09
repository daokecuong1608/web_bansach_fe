import { useState } from "react";
import './design/ThemHinhThucGiaoHang.css';
const ThemHinhThucGiaoHang = () => {
    const [tenHinhThucGiaoHang, setTenHinhThucGiaoHang] = useState('');
    const [chiPhiGiaoHang, setChiPhiGiaoHang] = useState(0);
    const [mota, setMota] = useState('');
    const [thongBao, setThongBao] = useState('');
    const [error, setError] = useState('');


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setError('');
        e.preventDefault();
        const isTenHinhThucGiaoHangValid = !await kiemTraTenHinhThucGiaoHangTonTai(tenHinhThucGiaoHang);
        if (isTenHinhThucGiaoHangValid) {
            try {
                const url = 'http://localhost:8080/api/them-hinh-thuc-giao-hang';
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        tenHinhThucGiaoHang: tenHinhThucGiaoHang,
                        chiPhiGiaoHang: chiPhiGiaoHang,
                        mota: mota
                    })
                });
                if (response.ok) {
                    setThongBao('Thêm hình thức giao hàng thành công');
                } else {
                    setThongBao('Thêm hình thức giao hàng thất bại');
                }
            } catch (error) {
                console.log("error", error);
            }
        }
    }

    const kiemTraTenHinhThucGiaoHangTonTai = async (tenHinhThucGiaoHang: string) => {
        const url = `http://localhost:8080/hinh-thuc-giao-hang/search/existsByTenHinhThucGiaoHang?tenHinhThucGiaoHang=${tenHinhThucGiaoHang}`;
        try {
            const response = await fetch(url);// Gửi yêu cầu HTTP và chờ phản hồi
            // Trích xuất dữ liệu văn bản từ phản hồi
            const data = await response.text();
            if (data === "true") {
                setError('Tên hình thức giao hàng   đã tồn tại');
                return true;
            }
            return false;
        } catch (error) {
            console.log("error", error);
            return false;
        }
    }


    const handleTenHinhThucGiaoHangChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTenHinhThucGiaoHang(e.target.value);
        setError('');
        return kiemTraTenHinhThucGiaoHangTonTai(e.target.value);
    }

    const handleGiaCharge = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!Number.isNaN(parseInt(e.target.value))) {
            setChiPhiGiaoHang(parseInt(e.target.value));
        }
        else {
            setChiPhiGiaoHang(0);
        }
    }

    return (
        <div className="container">
            <h1>Thêm hình thức giao hàng </h1>
            <form onSubmit={handleSubmit}>
                <div className="container">
                    <label htmlFor="ten">Tên hình thức giao hàng</label>
                    <input type="text"
                        className="form-control"
                        id="ten"
                        value={tenHinhThucGiaoHang}
                        onChange={handleTenHinhThucGiaoHangChange}
                    />
                    <div style={{ color: "red" }}>{error}</div>
                    <label htmlFor="gia">Chi phí giao hàng</label>
                    <input type="number"
                        className="form-control"
                        id="gia"
                        value={chiPhiGiaoHang}
                        onChange={handleGiaCharge}
                    />
                    <label htmlFor="mota">Mô tà</label>
                    <input type="text"
                        className="form-control"
                        id="mota"
                        value={mota}
                        onChange={(e) => setMota(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary">Thêm hình thức giao hàng</button>
                    <div style={{ color: "green" }}>{thongBao}</div>

                </div>
            </form>
        </div>
    );

}
export default ThemHinhThucGiaoHang;