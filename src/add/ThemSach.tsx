import React, { useState } from "react";

const ThemSach = () => {

    const [tenSach, setTenSach] = useState('');
    const [tacGia, setTacGia] = useState('');
    const [soLuong, setSoLuong] = useState(0);
    const [giaBan, setGiaBan] = useState(0);
    const [giaNiemYet, setGiaNiemYet] = useState(0);
    const [moTa, setMoTa] = useState('');
    const [isbn, setIsbn] = useState('');
    const [trungBinhXepHang, setTrungBinhXepHang] = useState(0);
    const [errorTenSach, setErrorTenSach] = useState('');
    const [errorISBN, setErrorISBN] = useState('');
    const [thongBao, setThongBao] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setErrorISBN('');
        setErrorTenSach('');
        e.preventDefault();
        const isTenSachValid = !await kiemTraTenSachTonTai(tenSach);
        const isISBNValid = !await kiemTraMaISBN(isbn);
        if (isTenSachValid && isISBNValid) {
            try {
                const url = 'http://localhost:8080/api/them-sach';
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        tenSach: tenSach,
                        tacGia: tacGia,
                        soLuong: soLuong,
                        giaBan: giaBan,
                        giaNiemYet: giaNiemYet,
                        moTa: moTa,
                        isbn: isbn,
                        trungBinhXepHang: trungBinhXepHang

                    })
                });
                if (response.ok) {
                    setThongBao('Thêm sách thành công');
                } else {
                    setThongBao('Thêm sách thất bại');
                }
            } catch (error) {
                console.log("error", error);
            }
        }
    }

    const handleTenSach = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTenSach(e.target.value);
        setErrorTenSach('')
        return kiemTraTenSachTonTai(e.target.value);
    }
    const kiemTraTenSachTonTai = async (tenSach: string) => {
        const url = `http://localhost:8080/sach/search/existsByTenSach?tenSach=${tenSach}`;
        try {
            const respone = await fetch(url)
            const data = await respone.text();
            if (data === "true") {
                setErrorTenSach('Tên sách đã tồn tại');
                return true;
            }
            return false
        } catch (error) {
            console.log("error", error);
            return false
        }

    }

    const handleSoLuong = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!Number.isNaN(parseInt(e.target.value))) {
            setSoLuong(parseInt(e.target.value));
            return false;
        } else {
            setSoLuong(0);
            return true;
        }
        return false;
    }
    const handleGiaNiemyet = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!Number.isNaN(parseInt(e.target.value))) {
            setGiaNiemYet(parseInt(e.target.value));
            return false;
        } else {
            setGiaNiemYet(0);
            return true;
        }
        return false;
    }
    const handleGiaBan = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!Number.isNaN(parseInt(e.target.value))) {
            setGiaBan(parseInt(e.target.value));
            return false;
        } else {
            setGiaBan(0);
            return true;
        }
        return false;
    }
    const kiemTraMaISBN = async (isbn: string) => {
        const url = `http://localhost:8080/sach/search/existsByISBN?isbn=${isbn}`;
        try {
            const response = await fetch(url);
            const data = await response.text();
            if (data === "true") {
                setErrorISBN('ISBN đã tồn tại');
                return true;
            }
            return false;
        } catch (error) {
            console.log("error", error);
            return false
        }
    }

    const handleISBN = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsbn(e.target.value);
        setErrorISBN('');
        return kiemTraMaISBN(e.target.value);
    }
    const handleTrungBinhXepHang = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        if (!Number.isNaN(value)) {
            if (value < 0.1 || value > 5) {
                setTrungBinhXepHang(0); // Hoặc giá trị mặc định khác nếu bạn muốn
                return true; // Trả về true nếu giá trị không hợp lệ
            } else {
                setTrungBinhXepHang(value);
                return false; // Trả về false nếu giá trị hợp lệ
            }
        } else {
            setTrungBinhXepHang(0); // Hoặc giá trị mặc định khác nếu bạn muốn
            return true; // Trả về true nếu giá trị không hợp lệ
        }
    };

    const handleTenTacGia = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTacGia(e.target.value);
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">

                    <label htmlFor="ten">Tên sách</label>
                    <input type="text"
                        className="form-control"
                        id="ten"
                        value={tenSach}
                        onChange={handleTenSach}
                    />
                    <div style={{ color: "red" }}>{errorTenSach}</div>

                    <label htmlFor="tacgia">Tên tác giả</label>
                    <input type="text"
                        className="form-control"
                        id="tacgia"
                        value={tacGia}
                        onChange={handleTenTacGia}
                    />

                    <label htmlFor="soluong">Số lượng </label>
                    <input type="number"
                        className="form-control"
                        id="soluong"
                        value={soLuong}
                        onChange={handleSoLuong}
                    />

                    <label htmlFor="gia">Giá niêm yết</label>
                    <input type="number"
                        className="form-control"
                        id="gia"
                        value={giaNiemYet}
                        onChange={handleGiaNiemyet}
                    />

                    <label htmlFor="giaban">Giá bán </label>
                    <input type="number"
                        className="form-control"
                        id="giaban"
                        value={giaBan}
                        onChange={handleGiaBan}
                    />

                    <label htmlFor="mota">Mô tả</label>
                    <input type="text"
                        className="form-control"
                        id="mota"
                        value={moTa}
                        onChange={(e) => setMoTa(e.target.value)}
                    />

                    <label htmlFor="isbn">ISBN</label>
                    <input type="text"
                        className="form-control"
                        id="isbn"
                        value={isbn}
                        onChange={handleISBN}
                    />
                    <div style={{ color: "red" }}>{errorISBN}</div>

                    <label htmlFor="trungbinhxephang"> Trung bình xếp hạng </label>
                    <input type="number"
                        className="form-control"
                        id="trungbinhxephang"
                        value={trungBinhXepHang}
                        onChange={handleTrungBinhXepHang}
                    />

                    <button type="submit" className="btn btn-primary">Thêm sách</button>
                    <div style={{ color: "green" }}>{thongBao}</div>
                </div>
            </form>
        </div>

    )

}
export default ThemSach;