import React, { useEffect, useState } from 'react';
import SachModel from '../../../models/SachModel';
import HinhAnhModel from '../../../models/HinhAnhModel';
import { lay1AnhCuaMotSach } from '../../../api/HinhAnhApi';
import './CarouselItem.css';
import renderRating from '../../utils/Start';

interface CarouselItemInterface {
    sach: SachModel;
}

//from hiển thị sách từ cơ sở dữ liệu(slideshow)
const CarouselItem: React.FC<CarouselItemInterface> = (props) => {

    // lấy dữ liệu từ props( truyền từ component cha xuống)
    const maSach: number = props.sach.maSach;
    const [danhSachHinhAnh, setDanhSachHinhAnh] = useState<HinhAnhModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);
    useEffect(() => {
        lay1AnhCuaMotSach(maSach).then(
            hinhAnhData => {
                setDanhSachHinhAnh(hinhAnhData);//gán gia trị mà mình lấy được từ server vào danhSachQuyenSach
                setDangTaiDuLieu(false);//đã tải xong dữ liệu
            }
        ).catch(
            error => {
                setDangTaiDuLieu(false);//đã tải xong dữ liệu
                setBaoLoi(error.message);//gặp lỗi thì báo lỗi
            });

    }, [])//chỉ gọi 1 lần 

    if (dangTaiDuLieu) {
        return (
            <div>
                <h1>Đang tải dữ liệu</h1>
            </div>
        )
    }
    if (baoLoi) {
        return (
            <div>
                <h1>Gặp lỗi : {baoLoi}</h1>
            </div>
        )
    }
    let duLieuAnh: string = "";
    if (danhSachHinhAnh[0] && danhSachHinhAnh[0].duLieuAnh) {
        duLieuAnh = danhSachHinhAnh[0].duLieuAnh;
    }

    return (
        <div className="centered-row">
            <div className="form-content">
                <img src={duLieuAnh}
                    className="form-image" />
                <br />
                <div className="form-text">
                    <h5>{props.sach.tenSach}</h5>
                    <h6>{renderRating(props.sach.trungBinhXepHang ? props.sach.trungBinhXepHang : 0)}</h6>
                </div>
            </div>
        </div>
    )
}
export default CarouselItem;