import { useEffect, useState } from "react";

import SachModel from "../../models/SachModel";
import SachProps from "./compoments/SachProps";
import { layToanBoSach } from "../../api/SachApi";
import { error } from "console";

const DanhSachSanPham: React.FC = () => {

    const [danhSachQuyenSach, setDanhSachQuyenSach] = useState<SachModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState<boolean>(true);
    const [baoLoi, setBaoLoi] = useState(null);


    useEffect(() => {

        layToanBoSach().then(
            sachData => {
                setDanhSachQuyenSach(sachData);//gán gia trị mà mình lấy được từ server vào danhSachQuyenSach
                setDangTaiDuLieu(false);//đã tải xong dữ liệu
            }
        ).catch(
            error => {
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
    // nếu ko gặp lỗi đoạn trên thì đoạn sau sẽ chạy
    return (
        <div className="container">
            <div className="row mt-4">{

                danhSachQuyenSach.map((sach) => (

                    <SachProps key={sach.maSach} sach={sach} />

                )
                )
            }
            </div>
        </div>
    )
}
export default DanhSachSanPham;