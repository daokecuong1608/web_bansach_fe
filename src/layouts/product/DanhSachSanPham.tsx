import { useEffect, useState } from "react";

import SachModel from "../../models/SachModel";
import SachProps from "./compoments/SachProps";
import { layToanBoSach } from "../../api/SachApi";
import { error } from "console";
import { Phantrang } from "../utils/PhanTrang";

const DanhSachSanPham: React.FC = () => {

    const [danhSachQuyenSach, setDanhSachQuyenSach] = useState<SachModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);
    const [trangHienTai, setTrangHienTai] = useState(1);
    const [tongSoTrang, setTongSoTrang] = useState(0);
    const [tongSoSach, setTongSoSach] = useState(0);

    useEffect(() => {
        layToanBoSach(trangHienTai - 1).then(
            kq => {
                setDanhSachQuyenSach(kq.ketQua);//gán gia trị mà mình lấy được từ server vào danhSachQuyenSach
                setTongSoTrang(kq.tongSoTrang);
                setDangTaiDuLieu(false);//đã tải xong dữ liệu
            }
        ).catch(
            error => {
                setDangTaiDuLieu(false);//đã tải xong dữ liệu
                setBaoLoi(error.message);//gặp lỗi thì báo lỗi
            });

    }, [trangHienTai])//chỉ gọi 1 lần 


    const phanTrang = (trang: number) => {
        setTrangHienTai(trang);
    }

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

    // nếu ko gặp lỗi đoạn trên thì đoạn sau sẽ chạy
    return (
        <div className="container">
            <div className="row mt-4">{
                danhSachQuyenSach.map((sach) => (
                    //in ra các quyến sách lấy từ server
                    <SachProps
                        key={sach.maSach}
                        sach={sach} />

                )
                )
            }
            </div>
            <Phantrang
                trangHienTai={trangHienTai}
                tongSoTrang={tongSoTrang}
                phanTrang={phanTrang} />
        </div>
    )
}
export default DanhSachSanPham;