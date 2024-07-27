import React from "react";
import HinhAnhModel from "../models/HinhAnhModel";
import { My_Request } from "./My_Request";

async function layAnhCuaSach(duongDan: string): Promise<HinhAnhModel[]> {

    //lấy dữ liệu từ server
    const ketQua: HinhAnhModel[] = [];
    //xấc định endpoint

    //Gọi phuonmg thức request để lấy dữ liệu
    const response = await My_Request(duongDan);

    //lay ra json tù sach dữ liệu
    const reponseData = response._embedded.hinhAnhs;

    // console.log("AAAA", reponse);
    for (const key in reponseData) {
        ketQua.push({

            maHinhAnh: reponseData[key].maHinhAnh,
            tenHinhAnh: reponseData[key].tenHinhAnh,//co the la undefined
            laIcon: reponseData[key].laIcon,
            duongDan: reponseData[key].duongDan,
            duLieuAnh: reponseData[key].duLieuAnh

        });
    }
    return ketQua;
}

export async function layToanBoAnhCuaSach(maSach: number): Promise<HinhAnhModel[]> {

    const duongDan: string = `http://localhost:8080/sach/${maSach}/danhSachHinhAnh`;
    return layAnhCuaSach(duongDan);

}

export async function lay1AnhCuaMotSach(maSach: number): Promise<HinhAnhModel[]> {

    const duongDan: string = `http://localhost:8080/sach/${maSach}/danhSachHinhAnh?sort=maHinhAnh,asc&page=0&size=1`;
    return layAnhCuaSach(duongDan);

}
//async : xử lý bất đồng bộ (SD từ khoá await) : => đợi 1 kết quả trả về từ server (Promise) khi tiếp tục thực hiện các lệnh tiếp theo
//Promise : trả về một giá trị