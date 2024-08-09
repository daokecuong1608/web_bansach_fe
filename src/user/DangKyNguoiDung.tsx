import { METHODS } from "http";
import { useState } from "react";
import './design/DangKyNguoiDung.css';
const DangKyNguoiDung = () => {

    const [tenDangNhap, setTenDangNhap] = useState('');
    const [email, setEmail] = useState('');
    const [hoDem, setHoDem] = useState('');
    const [ten, setTen] = useState('');
    const [soDienThoai, setSoDienThoai] = useState('');
    const [matKhau, setMatKhau] = useState('');
    const [matKhauNhapLai, setMatKhauNhapLai] = useState('');
    const [gioiTinh, setGioiTinh] = useState('');
    const [thongBao, setThongBao] = useState('');

    //băt lỗi (validate)
    const [errorTenDangNhap, setErrorTenDangNhap] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorMatKhau, setErrorMatKhau] = useState('');
    const [errorMatKhauNhapLai, setErrorMatKhauNhapLai] = useState('');
    const [errorSoDienThoai, setErrorSoDienThoai] = useState('');
    //xử lý sự kiện submit form
    const handleSubmit = async (e: React.FormEvent) => {
        //clear lỗi
        setErrorTenDangNhap('');
        setErrorEmail('');
        setErrorMatKhau('');
        setErrorMatKhauNhapLai('');
        setErrorSoDienThoai('');

        //tránh click liên tuccj
        e.preventDefault();

        //kiểm tra dữ liệu
        const isTenDangNhapValid = !await kiemTraTenDangNhapDanTontai(tenDangNhap);
        const isEmailValid = !await kiemTraEmailTonTai(email);
        const isMatKhauValid = !kiemTraMatKhau(matKhau);
        const isMatKhauNhapLaiValid = !kiemTraMatKhauNhapLai(matKhauNhapLai);
        //kiểm tra các điều kiện 
        if (isTenDangNhapValid && isEmailValid && isMatKhauValid && isMatKhauNhapLaiValid) {
            try {
                const url = 'http://localhost:8080/tai-khoan/dang-ky';
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        tenDangNhap: tenDangNhap,
                        email: email,
                        matKhau: matKhau,
                        hoDem: hoDem,
                        ten: ten,
                        soDienThoai: soDienThoai,
                        gioiTinh: gioiTinh
                    })
                }
                )
                if (response.ok) {
                    setThongBao('Đăng ký thành công');
                } else {
                    setThongBao('Đăng ký thất bại');
                }
            } catch (error) {
                console.log("error", error);

            }
        }
    }
    //kiểm tra tên đăng nhập đã tồn tại chưa
    const kiemTraTenDangNhapDanTontai = async (tenDangNhap: string) => {
        const url = `http://localhost:8080/nguoi-dung/search/existsByTenDangNhap?tenDangNhap=${tenDangNhap}`
        //call api
        try {
            const response = await fetch(url);
            const data = await response.text();
            if (data === "true") {
                setErrorTenDangNhap('Tên đăng nhập đã tồn tại');
                return true;
            }
            return false;
        } catch (error) {
            console.log("error", error);
            return false;
        }

    }

    //validate email(nhập email theo form quy định )
    const validateEmail = (email: string) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    //kiểm tra email đã tồn tại chưa
    const kiemTraEmailTonTai = async (email: string) => {
        const url = `http://localhost:8080/nguoi-dung/search/existsByEmail?email=${email}`
        //call api
        try {
            const response = await fetch(url);
            const data = await response.text();
            if (data === "true") {
                setErrorEmail('Email đã tồn tại');
                return true;
            } else {
                // if (!validateEmail(email)) {
                //     setErrorEmail('Email không hợp lệ');
                //    return true;
                // }
                return false;
            }
        } catch (error) {
            console.log("error", error);
            return false;
        }

    }


    const handleTenDangNhapChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //thay đổi giá trị của state
        setTenDangNhap(e.target.value);
        //ktra sự tồn tại 
        setErrorTenDangNhap('');
        return kiemTraTenDangNhapDanTontai(e.target.value);
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setErrorEmail('');
        return kiemTraEmailTonTai(e.target.value);
    }

    const kiemTraMatKhau = (matKhau: string) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(matKhau)) {
            setErrorMatKhau('Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ cái và số');
            return true;
        } else {
            setErrorMatKhau('');//mật khẩu hợp lệ
            return false;
        }
    }

    const handleMatKhauChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //thay đổi giá trị của state
        setMatKhau(e.target.value);
        //ktra sự tồn tại
        setErrorMatKhau('');
        return kiemTraMatKhau(e.target.value);
    }

    const kiemTraMatKhauNhapLai = (matKhauNhapLai: string) => {
        if (matKhauNhapLai !== matKhau) {
            setErrorMatKhauNhapLai('Mật khẩu không trùng khớp');
            return true;
        } else {
            setErrorMatKhauNhapLai('');
            return false;
        }
    }
    const handleMatKhauNhapLaiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMatKhauNhapLai(e.target.value);
        setErrorMatKhauNhapLai('');
        return kiemTraMatKhauNhapLai(e.target.value);
    }

    // Hàm validate số điện thoại Việt Nam
    const validateVietnamPhoneNumber = (soDienThoai: string): boolean => {
        return String(soDienThoai)
            .trim()
            .match(
                /^(?:\+84|84)?(03|05|07|08|09)\d{8}$/
            ) !== null;
    };

    const handleSoDienThoaiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (validateVietnamPhoneNumber(e.target.value)) {
            setSoDienThoai(e.target.value);
            setErrorSoDienThoai('');
        } else {
            setErrorSoDienThoai('Số điện thoại không hợp lệ');
        }
    }


    return (
        <div className="container">
            <h1 className="mt-5 text-center">Đăng ký </h1>
            <div className="mb-3 col-md-6 col-12 mx-auto">
                <form onSubmit={handleSubmit} className="form">

                    <div className="mb -3">
                        <label className="form-label">Tên đăng nhập</label>
                        <input type="text"
                            id="tenDangNhap"
                            className="form-control"
                            value={tenDangNhap}
                            onChange={handleTenDangNhapChange} />
                        <div style={{ color: "red" }}> {errorTenDangNhap}</div>
                    </div>

                    <div className="mb -3">
                        <label className="form-label">Mật khẩu</label>
                        <input type="password"
                            id="matKhau"
                            className="form-control"
                            value={matKhau}
                            onChange={handleMatKhauChange} />
                        <div style={{ color: "red" }}> {errorMatKhau}</div>
                    </div>

                    <div className="mb -3">
                        <label className="form-label">Nhập lại mật khẩu</label>
                        <input type="password"
                            id="matKhauNhapLai"
                            className="form-control"
                            value={matKhauNhapLai}
                            onChange={handleMatKhauNhapLaiChange} />
                        <div style={{ color: "red" }}> {errorMatKhauNhapLai}</div>
                    </div>

                    <div className="mb -3">
                        <label className="form-label">Họ đệm</label>
                        <input type="text"
                            id="hoDem"
                            className="form-control"
                            value={hoDem}
                            onChange={(e) => setHoDem(e.target.value)} />
                    </div>

                    <div className="mb -3">
                        <label className="form-label">Tên</label>
                        <input type="text"
                            id="ten"
                            className="form-control"
                            value={ten}
                            onChange={(e) => setTen(e.target.value)} />
                    </div>

                    <div className="mb -3">
                        <label className="form-label">Email</label>
                        <input type="email"
                            id="email"
                            className="form-control"
                            value={email}
                            onChange={handleEmailChange} />
                        <div style={{ color: "red" }}> {errorEmail}</div>
                    </div>

                    <div className="mb -3">
                        <label className="form-label">Số điện thoại:</label>
                        <input type="text"
                            id="soDienThoai"
                            className="form-control"
                            value={soDienThoai}
                            onChange={(e) => setSoDienThoai(e.target.value)} />
                        {/* <div style={{ color: "red" }}> {errorSoDienThoai}</div> */}

                    </div>

                    <div className="mb-3">
                        <label className="form-label" htmlFor="gioiTinh">Giới tính:</label>
                        <select
                            id="gioiTinh"
                            className="form-control"
                            value={gioiTinh}
                            onChange={(e) => setGioiTinh(e.target.value)}
                        >
                            <option value=""></option>
                            <option value="nam">Nam</option>
                            <option value="nu">Nữ</option>
                            <option value="khac">Khác</option>
                        </select>
                    </div>

                    <div className="text-center">
                        <button type="submit" className="btn btn-primary">Đăng ký</button>
                        <div style={{ color: "green" }}>{thongBao}</div>
                    </div>

                </form>
            </div>

        </div>
    );
}
export default DangKyNguoiDung;