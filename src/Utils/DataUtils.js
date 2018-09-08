let $ = require("jquery");
const STORE_ID = 4;

let obj = {
    uploadFile() {
        const data = new FormData();
        let files = $("#uploadFile")[0].files;
        data.append('uploadFile', files[0]);
        //data.append('filename', this.fileName.value);
        return $.when(
        $.ajax({
            url:"http://gunivn.com/guni/index.php/api/upload",
            data: data,
            type:"post",
            contentType:false,
            processData:false,
            cache:false,
            dataType:"json"
          })
        );
    },
    getItem(api, id) {
        let _url = "http://gunivn.com/guni/index.php"+api + "?id="+id+"&store_id=" +STORE_ID;
        return $.when(
            $.ajax({
                method: "GET",
                url: _url,
                dataType: 'json'
            })
        );
    },
    getList(api, filter) {
        let _url = "http://gunivn.com/guni/index.php"+api + "?store_id=" +STORE_ID;
        if(filter) {
            _url += ("&"+ $.param(filter));
        }
        return $.when(
            $.ajax({
                method: "GET",
                url: _url,
                dataType: 'json'
            })
        );
    },
    create(api, dataSave) {
        return $.when(
            $.ajax({
                method: "POST",
                url: "http://127.0.0.1:8000"+api + "?store_id=" +STORE_ID,
                dataType: 'json',
                data: {data: dataSave}
            })
        );
    },
    remove(api, id) {
        return $.when(
            $.ajax({
                method: "POST",
                url: "http://gunivn.com/guni/index.php" +api,
                dataType: 'json',
                data: JSON.stringify({id: id, store_id: STORE_ID})
            })
        );
    },
    save(api, dataSave) {
        dataSave['store_id'] = STORE_ID
        return $.when(
            $.ajax({
                method: "POST",
                url: "http://gunivn.com/guni/index.php" +api,
                dataType: 'json',
                data: JSON.stringify({data: dataSave})
            })
        );
    },
    getUserList() {
        return [
            {
                email: "duy.hngoc@gmail.com",
                firstname: "Duy",
                lastname: "Huynh",
                password: "abc"
            },
            {
                email: "admin@gmail.com",
                firstname: "Van",
                password: "admin",
                lastname: "Anh",
            },
            {
                email: "anngon@gmail.com",
                firstname: "An",
                lastname: "ngon",
                password: "123"
            },
            {
                email: "teo@gmail.com",
                firstname: "Teo",
                lastname: "Van",
                password: "123"
            },
            {
                email: "Ti@gmail.com",
                firstname: "Ti",
                lastname: "Van",
                password: "123"
            }
        ];
    },

    checkUser(username, password) {
        let userList = this.getUserList();
        let userInfo = null;
        for(let index in userList) {
            if(userList[index].email == username && userList[index].password == password) {
                userInfo = {
                    email: userList[index].email,
                    name: (userList[index].firstname + " " + userList[index].lastname)
                };
                break; 
            }
        }

        return userInfo;
    },
    getUserInfo() {
        let userInfo = window.localStorage.getItem("session");
        if(userInfo != null) {
            userInfo = JSON.parse(userInfo);
        }

        return userInfo;
    
    },
    getProductList(type) {
        let data =  [
            {
                id: 1,
                name: "Tai Nghe Chụp Tai Sony MDR-H600A Hi-Res",
                img: "/images/products/tiki_phone_01.jpg",
                price: 2990000,
                type: "Phone",
                brand: "Sony",
                salesoff: 25,
                catalogid: 1,
                description: '<div class="top-feature-item bullet-wrap"><p>Sử dụng driver Dynamic HD Audio High-Resolution 40mm phủ Titan </p><p>Cáp Tangle-free tráng bạc giúp giảm nhiễu tối đa</p><p>Đệm tai nghe mềm mại, tạo cảm giác thoải mái khi sử dụng</p><p>Tích hợp microphone giúp trả lời cuộc gọi nhanh chóng</p><p>Cơ chế gập xoay linh hoạt thuận tiện cho di chuyển</p><p>Thiết kế đơn sắc thời thượng với thanh choàng đầu dạng trượt</p><p>Dải âm tần: 5 – 60,000 Hz</p><p>Độ nhạy: 103 dB/mW</p></div>'
            },
            {
                id: 2,
                name: "Tai Nghe Chụp Tai Sennheiser HD 4.20s",
                img: "images/products/tiki_phone_02.jpg",
                price: 1420000,
                type: "Phone",
                brand: "Sony",
                catalogid: 2,
                salesoff: 25,
                description: '<div class="top-feature-item bullet-wrap"><p>Trở kháng: 18 Ohm</p><p>Tần số đáp ứng: 18 - 20.000 Hz</p><p>Áp lực âm thanh: 118dB (1kHz/1Vrms)</p><p>Tổng lượng méo: &lt;0.5% (1kHz/100dB)</p><p>Cổng kết nối: 3.5mm</p><p>Pad tai mềm mại, cao cấp làm bằng da</p><p>Dây chống rối với một nút điều khiển thông min</p></div>'
            },
            {
                id: 3,
                name: "Tai Nghe Nhét Tai Sennheiser MX 80",
                img: "images/products/tiki_phone_03.jpg",
                price: 99000,
                type: "Phone",
                brand: "Sony",
                salesoff: 25,
                catalogid: 2,
                description: '<div class="top-feature-item bullet-wrap"><p>Thiết kế dạng earbud</p><p>Màng loa được làm từ nam châm Neodymium</p><p>Dải tần số 50Hz - 15.000Hz </p><p>Jack cắm 3.5mm</p></div>'
            },
            {
                id: 4,
                name: "Tai Nghe Nhét Tai Sennheiser MX 80",
                img: "images/products/tiki_phone_03.jpg",
                price: 99000,
                type: "Phone",
                brand: "Sony",
                salesoff: 25,
                catalogid: 2,
                description: '<div class="top-feature-item bullet-wrap"><p>Thiết kế dạng earbud</p><p>Màng loa được làm từ nam châm Neodymium</p><p>Dải tần số 50Hz - 15.000Hz </p><p>Jack cắm 3.5mm</p></div>'
            },
            {
                id: 5,
                name: "Tai Nghe Nhét Tai Sennheiser MX 80",
                img: "images/products/tiki_phone_03.jpg",
                price: 99000,
                type: "Phone",
                brand: "Sony",
                catalogid: 3,
                salesoff: 25,
                description: '<div class="top-feature-item bullet-wrap"><p>Thiết kế dạng earbud</p><p>Màng loa được làm từ nam châm Neodymium</p><p>Dải tần số 50Hz - 15.000Hz </p><p>Jack cắm 3.5mm</p></div>'
            },
            {
                id: 6,
                name: "Tai Nghe Nhét Tai Sennheiser MX 80",
                img: "images/products/tiki_phone_03.jpg",
                price: 99000,
                type: "Phone",
                catalogid: 2,
                brand: "Sony",
                salesoff: 25,
                description: '<div class="top-feature-item bullet-wrap"><p>Thiết kế dạng earbud</p><p>Màng loa được làm từ nam châm Neodymium</p><p>Dải tần số 50Hz - 15.000Hz </p><p>Jack cắm 3.5mm</p></div>'
            }
        ];

        if(type) {
            let tmp = [];
            for(let index in data) {
                if(data[index].catalogid == type) {
                    tmp.push(data[index]);
                } 
            }
            data = tmp;
        }

        return data;
    },
    getProduct(id) {
        let productList = this.getProductList();
        let product = null;
        for(let i in productList) {
            if(productList[i].id == id) {
                product = productList[i];
                break;
            }
        }
        return product;
    }
};

module.exports = obj;