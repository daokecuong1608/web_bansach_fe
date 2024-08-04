import { useParams } from "react-router-dom";
import DanhSachSanPham from "../product/DanhSachSanPham";

import Banner from "./compoments/Banner";
import Carousel from "./compoments/Carousel";

interface HomePageProps {
    tuKhoaTimKiem: string;
}
//luôn nhận được thông tin tìm kiếm 
function HomePage({ tuKhoaTimKiem }: HomePageProps) {

    //lấy thông tin từ url va gan vao bien 
    const { maTheLoai } = useParams();
    let maTheLoaiNumber = 0;
    try {
        maTheLoaiNumber = parseInt(maTheLoai + '');
    } catch (error) {
        maTheLoaiNumber = 0;
        console.log("loi", error);
    }
    //biến ko xác định được giá trị 
    if (Number.isNaN(maTheLoaiNumber)) {
        maTheLoaiNumber = 0;
    }

    return (
        <div>
            <Banner />
            {/* slideshow */}
            <Carousel />
            {/* in ra danh sách sản phẩm */}
            {/* truyền vào cập nhật dữ liệu tìm kiếm  từ server */}
            <DanhSachSanPham
                tuKhoaTimKiem={tuKhoaTimKiem}
                maTheLoai={maTheLoaiNumber}
            />
        </div>
    )
}
export default HomePage;