import DanhSachSanPham from "../product/DanhSachSanPham";

import Banner from "./compoments/Banner";
import Carousel from "./compoments/Carousel";

const HomePage = () => {
    return (
        <div>

            <Banner />
            {/* slideshow */}
            <Carousel />
            {/* in ra danh sách sản phẩm */}
            <DanhSachSanPham />
        </div>
    )
}
export default HomePage;