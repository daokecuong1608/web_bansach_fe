
import { useEffect, useState } from 'react';

import SachModel from '../../models/SachModel';
import { laySachTheoMaSach } from '../../api/SachApi';
import HinhAnhSanPham from './HinhAnhSanPham';
import DanhGiaSanPham from './DanhGiaSanPham';
import renderRating from "../utils/Start";
import DinhDangSo from '../utils/DinhDangSo';
import { useParams } from 'react-router-dom';
import { Plus } from 'react-bootstrap-icons';


const ChiTietSanPham: React.FC = () => {

    // lấy thông tin từ url va gan vao bien
    const { maSach } = useParams();

    let maSachNumber = 0;
    try {
        maSachNumber = parseInt(maSach + '');
        //bắt lỗi không xác định được giá trị
        if (Number.isNaN(maSachNumber)) {
            maSachNumber = 0;
        }
    } catch (error) {
        maSachNumber = 0;
        console.log("loi", error);
    }

    //khai báo 
    const [sach, setSach] = useState<SachModel | null>(null);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);
    const [soLuong, setSoLuong] = useState(1);

    const tangSoLuong = () => {
        const soLuongTonKho = (sach && sach.soLuong ? sach.soLuong : 0);
        if (soLuong < soLuongTonKho) {
            setSoLuong(soLuong + 1);
        }
    }

    const giamSoLuong = () => {
        if (soLuong > 2) {
            setSoLuong(soLuong - 1);
        }
    }
    const handleSoLuongChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const soLuongMoi = parseInt(event.target.value);
        const soLuongTonKho = (sach && sach.soLuong ? sach.soLuong : 0);
        if (!isNaN(soLuongMoi) && soLuongMoi >= 1 && soLuongMoi <= soLuongTonKho) {
            setSoLuong(soLuongMoi);
        }
    }

    const handleMuaNgay = () => {
    }
    const handleThemVaoGioHang = () => {

    }
    //useEffect: quản lý vòng đời của của một component
    useEffect(() => {
        laySachTheoMaSach(maSachNumber).
            then((sach) => {
                setSach(sach);
                setDangTaiDuLieu(false);
            }
            ).catch((error) => {
                setBaoLoi(error.message);
                setDangTaiDuLieu(false);
            }
            )
    }, [maSach] //mỗi khi maSach thay đổi thì useEffect sẽ chạy lại
    )

    if (dangTaiDuLieu) {
        return (
            <div>
                <h1>Đang tải dữ liệu</h1>
            </div>
        )
    }
    //nếu gặp lỗi thì báo lỗi
    if (baoLoi) {
        return (
            <div>
                <h1>Gặp lỗi : {baoLoi}</h1>
            </div>
        )
    }
    if (!sach) {
        return (
            <div>
                <h1>Không tìm thấy sách</h1>
            </div>
        )
    }
    return (
        <div className="container">
            <div className="row mt-4 mb-4">
                {/* //bên trái */}
                <div className="col-4">
                    <HinhAnhSanPham
                        maSach={maSachNumber}
                    />
                </div>
                {/* //bên phải */}
                <div className="col-8">
                    <div className="row">
                        <div className="col-8">
                            <h1> {sach.tenSach}</h1>
                            <h3>{renderRating(sach.trungBinhXepHang ? sach.trungBinhXepHang : 0)}</h3>
                            <h4 >{sach.soLuong} cuốn</h4>
                            <h4>{DinhDangSo(sach.giaBan ? sach.giaBan : 0)}</h4>
                            <hr />
                            {/* đọc đoạn code html từ server */}
                            <div dangerouslySetInnerHTML={{ __html: (sach.moTa + '') }} />
                            <hr />
                        </div>
                        <div className="col-4">
                            <div>
                                <div className="mb-2">  Số lượng </div>
                                <div className="d-flex align-items-center">
                                    <button className="btn btn-outline-secondary me-2" onClick={giamSoLuong}>-</button>
                                    <input
                                        value={soLuong}
                                        className="form-control text-center"
                                        type="number"
                                        min={1}
                                        onChange={handleSoLuongChange}
                                    />
                                    <button className="btn btn-outline-secondary ms-2" onClick={tangSoLuong}>+</button>

                                </div>

                                {
                                    sach.giaBan && (
                                        <div className="mt-2 text-center">
                                            Số tiền tạm tính <br />
                                            <h4>{DinhDangSo(soLuong * sach.giaBan)}</h4>
                                        </div>
                                    )
                                }

                                <div className="d-grid gap-2">
                                    <button type="button" className="btn btn-outline-secondary mt-3" onClick={handleThemVaoGioHang}>Thêm vào giỏ hàng</button>
                                    <button type="button" className="btn btn-danger mt-3" onClick={handleMuaNgay}>Mua ngay</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-4 mb-4">
                <DanhGiaSanPham maSach={maSachNumber} />
            </div>
        </div>
    )
}
export default ChiTietSanPham;