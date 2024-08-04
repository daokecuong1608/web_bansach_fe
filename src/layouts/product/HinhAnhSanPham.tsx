import React, { useEffect, useState } from "react";
import HinhAnhModel from "../../models/HinhAnhModel";
import { lay1AnhCuaMotSach, layToanBoAnhCuaSach } from "../../api/HinhAnhApi";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";

interface HinhAnhSanPham {
    maSach: number
}

const HinhAnhSanPham: React.FC<HinhAnhSanPham> = (props) => {
    // lấy dữ liệu từ props( truyền từ component cha xuống)
    const maSach: number = props.maSach;

    const [danhSachHinhAnh, setDanhSachHinhAnh] = useState<HinhAnhModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);
    const [hinhAnhDangChon, setHinhAnhDangChon] = useState<HinhAnhModel | null>(null);

    const chonAnh = (hinhAnh: HinhAnhModel) => {
        setHinhAnhDangChon(hinhAnh);
    }

    //useEffect: quản lý vòng đời của của một component
    useEffect(() => {
        layToanBoAnhCuaSach(maSach).then(
            danhSachAnh => {
                setDanhSachHinhAnh(danhSachAnh);//gán gia trị mà mình lấy được từ server vào danhSachQuyenSach
                if (danhSachAnh.length > 0) {
                    setHinhAnhDangChon(danhSachAnh[0]);
                }
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
        <div className="col-md-3 mt-2">
            <div>'
                {hinhAnhDangChon && <img src={hinhAnhDangChon.duLieuAnh} />}
            </div>

            <div className="row">
                {
                    danhSachHinhAnh.map((hinhAnh, index) => (

                        <div className={"col-3"} key={index}>
                            <img onClick={() => chonAnh(hinhAnh)} src={hinhAnh.duLieuAnh} />
                        </div>

                    )
                    )
                }
            </div>
        </div>


    )


}
export default HinhAnhSanPham;