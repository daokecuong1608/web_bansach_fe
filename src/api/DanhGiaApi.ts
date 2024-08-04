import React from "react";
import { My_Request } from "./My_Request";
import DanhGiaSanPham from "../layouts/product/DanhGiaSanPham";
import DanhGiaModel from "../models/DanhGiaModel";

async function layDanhGiaCuaSach(duongDan: string): Promise<DanhGiaModel[]> {

    //lấy dữ liệu từ server
    const ketQua: DanhGiaModel[] = [];
    //xấc định endpoint

    //Gọi phuonmg thức request để lấy dữ liệu
    const response = await My_Request(duongDan);

    //lay ra json tù sach dữ liệu
    const reponseData = response._embedded.DanhGias;

    // console.log("AAAA", reponse);
    for (const key in reponseData) {
        ketQua.push({
            maDanhGia: reponseData[key].maDanhGia,
            nhanXet: reponseData[key].nhanXet,
            diemXepHang: reponseData[key].diemXepHang,

        });
    }
    return ketQua;
}

export async function layToanBoDanhGiaCuaMotSach(maSach: number): Promise<DanhGiaModel[]> {

    const duongDan: string = `http://localhost:8080/sach/${maSach}/danhSachSuDanhGia`;
    return layDanhGiaCuaSach(duongDan);

}


//async : xử lý bất đồng bộ (SD từ khoá await) : => đợi 1 kết quả trả về từ server (Promise) khi tiếp tục thực hiện các lệnh tiếp theo
//Promise : trả về một giá trị