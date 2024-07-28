import DanhSachSanPham from "../product/DanhSachSanPham";

import Banner from "./compoments/Banner";
import Carousel from "./compoments/Carousel";

interface HomePageProps {
    tuKhoaTimKiem: string;
}
//luôn nhận được thông tin tìm kiếm 
function HomePage({ tuKhoaTimKiem }: HomePageProps) {
    return (
        <div>

            <Banner />
            {/* slideshow */}
            <Carousel />
            {/* in ra danh sách sản phẩm */}
            {/* truyền vào cập nhật dữ liệu tìm kiếm  từ server */}
            <DanhSachSanPham
                tuKhoaTimKiem={tuKhoaTimKiem}
            />
        </div>
    )
}
export default HomePage;