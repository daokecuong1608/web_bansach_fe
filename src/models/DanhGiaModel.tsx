class DanhGiaModel {
    maDanhGia: number;
    diemXepHang: number;
    nhanXet: string;


    constructor(maDanhGia: number, diemXepHang: number, nhanXet: string) {
        this.maDanhGia = maDanhGia;
        this.nhanXet = nhanXet;
        this.diemXepHang = diemXepHang;

    }

}
export default DanhGiaModel;