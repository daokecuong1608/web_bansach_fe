
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import HinhAnhModel from '../../models/HinhAnhModel';
import SachModel from '../../models/SachModel';
import { laySachTheoMaSach } from '../../api/SachApi';
import HinhAnhSanPham from './HinhAnhSanPham';
import DanhGiaSanPham from './DanhGiaSanPham';


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
                            <h3>{sach.trungBinhXepHang}</h3>
                            <h4>{sach.giaBan}</h4>
                            <hr />
                            {/* đọc đoạn code html từ server */}
                            <div dangerouslySetInnerHTML={{ __html: (sach.moTa + '') }} />

                            <hr />
                        </div>
                        <div className="col-4">
                            phần đặt hàng
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