import React from "react";


//chờ để lấy dữ liệu từ server
export async function My_Request(duongDan: string) {
    //fetch là hàm lấy dữ liệu từ server(truy vấn đuường dẫn)
    const response = await fetch(duongDan);
    //nEU kiem tra xem có lỗi không
    if (!response.ok) {
        throw new Error('Không thể truy cập được server ${duongDan}');
    }
    //trả về toàn bộ dữ liệu bên trong 
    return response.json();
}
