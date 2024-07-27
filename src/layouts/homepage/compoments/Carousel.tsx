
import { useEffect, useState } from "react";
import { error } from "console";
import React from "react";
import { layBaBoSachNew } from "../../../api/SachApi";
import SachModel from "../../../models/SachModel";
import CarouselItem from "./CarouselItem";


//slideshow 
const Carousel: React.FC = () => {
    const [danhSachQuyenSach, setDanhSachQuyenSach] = useState<SachModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);


    useEffect(() => {
        layBaBoSachNew().then(
            kq => {
                setDanhSachQuyenSach(kq.ketQua);//gán gia trị mà mình lấy được từ server vào danhSachQuyenSach
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


    //lầy từ server về 3 quyển sách trên sildeShow
    return (
        <div>
            <div id="carouselExampleDark" className=
                "carousel carousel-dark slide">
                <div className=
                    "carousel-inner">
                    <div className="carousel-item active" data-bs-interval="10000">
                        <CarouselItem
                            key={0}
                            sach={danhSachQuyenSach[0]} />
                    </div>
                    <div className="carousel-item" data-bs-interval="10000">
                        <CarouselItem
                            key={1}
                            sach={danhSachQuyenSach[1]} />
                    </div>

                    <div className="carousel-item" data-bs-interval="10000">
                        <CarouselItem
                            key={2}
                            sach={danhSachQuyenSach[2]} />
                    </div>

                </div>
                <button className=
                    "carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                    <span className=
                        "carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className=
                        "visually-hidden">Previous</span>
                </button>
                <button className=
                    "carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                    <span className=
                        "carousel-control-next-icon" aria-hidden="true"></span>
                    <span className=
                        "visually-hidden">Next</span>
                </button>
            </div>

        </div>
    )
}
export default Carousel;