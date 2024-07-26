import React, { useEffect, useState } from 'react';
import Book from '../../../models/Book';
import SachModel from '../../../models/SachModel';
import HinhAnhModel from '../../../models/HinhAnhModel';
import { lay1AnhCuaMotSach } from '../../../api/HinhAnhApi';


interface CarouselItemInterface {
    sach: SachModel;
}

const CarouselItem: React.FC<CarouselItemInterface> = (props) => {

    // lấy dữ liệu từ props( truyền từ component cha xuống)
    const maSach: number = props.sach.maSach;
    const [danhSachHinhAnh, setDanhSachHinhAnh] = useState<HinhAnhModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);

    useEffect(() => {

        lay1AnhCuaMotSach(maSach).then(
            sachData => {
                setDanhSachHinhAnh(danhSachHinhAnh);//gán gia trị mà mình lấy được từ server vào danhSachQuyenSach
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
        <div className="row align-items-center">
            <div className="col-5 text-center">
                <img src={duLieuAnh}
                    className="float-end"
                    style={{ width: '150px' }} />
            </div>
            <div className="col-7">
                <h5>{props.sach.tenSach}</h5>
                <p>{props.sach.moTa}</p>
            </div>
        </div>
    )
}
export default CarouselItem;