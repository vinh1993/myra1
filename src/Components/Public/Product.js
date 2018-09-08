import React from 'react';
import './Index.css'
import {Jumbotron, Button, Thumbnail,Grid,Col} from 'react-bootstrap';

import CurrencyFormat from 'react-currency-format';

class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                name: "Tai Nghe Chụp Tai Sony MDR-H600A Hi-Res",
                img: "/images/products/tiki_phone_01.jpg",
                price: 2990000,
                type: "Phone",
                brand: "Sony",
                salesoff: 25,
                description: '<div class="top-feature-item bullet-wrap"><p>Sử dụng driver Dynamic HD Audio High-Resolution 40mm phủ Titan </p><p>Cáp Tangle-free tráng bạc giúp giảm nhiễu tối đa</p><p>Đệm tai nghe mềm mại, tạo cảm giác thoải mái khi sử dụng</p><p>Tích hợp microphone giúp trả lời cuộc gọi nhanh chóng</p><p>Cơ chế gập xoay linh hoạt thuận tiện cho di chuyển</p><p>Thiết kế đơn sắc thời thượng với thanh choàng đầu dạng trượt</p><p>Dải âm tần: 5 – 60,000 Hz</p><p>Độ nhạy: 103 dB/mW</p></div>'
            }
        };
        
        if(props.data) {
            this.state.data = props.data;
        }
    }
    render() {
        let salesOffPrice = parseFloat(this.state.data.inventory_price) * (parseFloat(this.state.data.inventory_saleoff)*0.01);
        let salePrice = (<CurrencyFormat value={parseFloat(this.state.data.inventory_price) - salesOffPrice} decimalSeparator={'.'} displayType={'text'} thousandSeparator={','} suffix={'đ'} />);
        let realPrice = (<CurrencyFormat value={parseFloat(this.state.data.inventory_price)} decimalSeparator={'.'} displayType={'text'} thousandSeparator={','} suffix={'đ'} />);

        return (
            <Col xs={12} md={12} >
                <Thumbnail>

                <div className="hovereffect">
            <img className="img-responsive"  src={this.state.data.inventory_img} />
            <div className="overlay">
            <a className="info"  >Product Detail</a>

            </div>
          </div>
                    <h3>{this.state.data.inventory_name}</h3>
                    <h4 className="product-item-price">
                        
                        <span className="sale-price">
                            {salePrice}
                        </span>
                        <span className="real-price">
                            {realPrice}
                        </span>
                        <span className="saleoff-price">
                            -{parseFloat(this.state.data.inventory_saleoff)}%
                        </span>
                        
                    </h4>
                    <p>
                        <Button style={{opacity: 0, cursor: "default"}} disabled bsStyle="default">Button</Button>    
                        <Button className="pull-right" bsStyle="warning">Liên Hệ</Button>
                    </p>
                </Thumbnail>
                </Col>
        );
    }
}

export default Product;