import React, { useEffect, useState } from 'react';
import Book from '../../../models/Book';
import SachModel from '../../../models/SachModel';
import HinhAnhModel from '../../../models/HinhAnhModel';
import { lay1AnhCuaMotSach, layToanBoAnhCuaSach } from '../../../api/HinhAnhApi';


interface SachPropsInterface {
    sach: SachModel;
}

const SachProps: React.FC<SachPropsInterface> = (props) => {

    // lấy dữ liệu từ props( truyền từ component cha xuống)
    const maSach: number = props.sach.maSach;
    const [danhSachHinhAnh, setDanhSachHinhAnh] = useState<HinhAnhModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);

    //useEffect: quản lý vòng đời của của một component
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
    //nếu gặp lỗi thì báo lỗi
    if (baoLoi) {
        return (
            <div>
                <h1>Gặp lỗi : {baoLoi}</h1>
            </div>
        )
    }

    //lấy dữ liệu ảnh từ server
    let duLieuAnh: string = "";
    if (danhSachHinhAnh[0] && danhSachHinhAnh[0].duLieuAnh) {
        duLieuAnh = danhSachHinhAnh[0].duLieuAnh;
    }

    //form hiển thị sách từ cơ sở dữ liệu 
    return (
        <div className="col-md-3 mt-2">
            <div className="card">
                {/* kha nang khong co du lieu anh */}
                <img src={duLieuAnh}
                    className="card-img-top"
                    alt={props.sach.tenSach}
                    style={{ height: '200px' }} />

                <div className="card-body">
                    <h5 className="card-title">{props.sach.tenSach}</h5>
                    <p className="card-text">{props.sach.moTa}</p>
                    <p className="card-text">{props.sach.soLuong}</p>
                    <div className="price">
                        <span className="original-price">
                            <strong> {props.sach.giaBan}</strong>

                        </span>
                    </div>

                    <div className="row mt-2" role="group">
                        <div className="col-6">
                            <a href="#" className="btn btn-secondary btn-block">
                                <i className="fas fa-heart"></i>
                            </a>
                        </div>
                        <div className="col-6">
                            <a href="#" className="btn btn-danger btn-block">
                                <i className="fas fa-shopping-cart"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SachProps;