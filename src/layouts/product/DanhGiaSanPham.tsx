import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import { layToanBoDanhGiaCuaMotSach } from "../../api/DanhGiaApi";
import DanhGiaModel from "../../models/DanhGiaModel";

interface DanhGiaSanPham {
    maSach: number
}

const DanhGiaSanPham: React.FC<DanhGiaSanPham> = (props) => {
    // lấy dữ liệu từ props( truyền từ component cha xuống)
    const maSach: number = props.maSach;

    const [danhSachDanhGia, setDanhSachDanhGia] = useState<DanhGiaModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);



    //useEffect: quản lý vòng đời của của một component
    useEffect(() => {
        layToanBoDanhGiaCuaMotSach(maSach).then(
            danhSachDanhGia => {
                setDanhSachDanhGia(danhSachDanhGia);//gán gia trị mà mình lấy được từ server vào danhSachQuyenSach
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


    //form hiển thị sách từ cơ sở dữ liệu 
    return (
        <div className="container mt-2 mb-2 text-center">
            <h3>Đánh giá sản phẩm</h3>
            {
                danhSachDanhGia.map((danhGia, index) => (
                    <div className="row text-align:right">
                        <div className="col-4">
                            <h3>{danhGia.diemXepHang}</h3>
                        </div>
                        <div className="col-8">
                            <p>{danhGia.nhanXet}</p>
                        </div>
                    </div>
                )
                )
            }
        </div >
    )
}
export default DanhGiaSanPham;