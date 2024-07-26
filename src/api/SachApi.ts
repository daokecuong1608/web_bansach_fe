import React from "react";
import { Type } from "typescript";
import SachModel from "../models/SachModel";
import { My_Request } from "./My_Request";

async function laySach(duongDan: string): Promise<SachModel[]> {
    //lấy dữ liệu từ server
    const ketQua: SachModel[] = [];


    //Gọi phuonmg thức request để lấy dữ liệu
    const reponse = await My_Request(duongDan);

    //lay ra json tù sach dữ liệu
    const reponseData = reponse._embedded.saches;
    // console.log(reponse);
    for (const key in reponseData) {
        ketQua.push({
            maSach: reponseData[key].maSach,
            tenSach: reponseData[key].tenSach,//co the la undefined
            giaBan: reponseData[key].giaBan,
            giaNiemYet: reponseData[key].giaNiemYet,
            moTa: reponseData[key].moTa,
            soLuong: reponseData[key].soLuong,
            tenTacGia: reponseData[key].tenTacGia,
            trungBinhXepHang: reponseData[key].trungBinhXepHang

            //đưa sách vào mảng
            // ketQua.push(sachModel);
        });

        // const sach = reponseData[key];
        // //tạo một đối tượng sách
        // const sachModel = new SachModel(
        //     sach.maSach,
        //     sach.tenSach,
        //     sach.giaBan,
        //     sach.giaNiemYet,
        //     sach.moTa,
        //     sach.soLuong,
        //     sach.tenTacGia,
        //     sach.trungBinhXepHang
        // );
        // //      đưa sách vào mảng
        // ketQua.push(sachModel);

    }

    // console.log(ketQua);
    return ketQua;
}


//lấy tất cả các sách từ server
//Promise<SachModel[]> : trả về một mảng các sách
export async function layToanBoSach(): Promise<SachModel[]> {
    //xấc định endpoint
    const duongDan: string = 'http://localhost:8080/sach?sort=maSach,desc';
    return laySach(duongDan);
}
export async function layBaBoSachNew(): Promise<SachModel[]> {
    //xấc định endpoint
    const duongDan: string = 'http://localhost:8080/sach?sort=maSach,desc&page=0&size=3';
    return laySach(duongDan);
}