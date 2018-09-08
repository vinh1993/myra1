import React from 'react';
import queryString from 'query-string';
import DataUtils from '../Utils/DataUtils';

import CurrencyFormat from 'react-currency-format';
import {
    Grid, Row, 
    Col, Image, 
    ListGroup, ListGroupItem, 
     Button, FormGroup, HelpBlock,
    ControlLabel, FormControl,
    Panel
    } from 'react-bootstrap';

import UploadFile from './Administration/UploadFile';

import "./Styles/ProductDetail.css";


function FieldGroup({ id, label, help, ...props }) {
    return (
      <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
    );
  }

class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {Id: null, info: null, isEdit: false, brandList: [], catalogList:[]};

        this.state.Id = this.getIdFromQueryString();
        if(this.state.Id === 0) {
            this.state.isEdit = true;
        }
        this.state.info = this.getProduct();
        this.handleChange = this.handleChange.bind(this);
        this.buildBrandList = this.buildBrandList.bind(this);
    }

    componentDidMount() {
        this.buildBrandList();
        this.buildCatalogList();
        window.jQuery(".product-image").elevateZoom(
            {zoomWindowPosition: 1, borderSize: 2}
        );
    }
    buildBrandList() {
        DataUtils.getList("/api/brand/list")
        .then((res) => {
            let _brandList = [];
            if(res.Success) {
                for(let i in res.Data) {
                    _brandList.push(
                        <option key={i} value={res.Data[i].brand_id}>{res.Data[i].brand_name}</option>
                    )
                }
            }
            this.setState({brandList: _brandList});
        })
    }
    buildCatalogList() {
        DataUtils.getList("/api/catalog/list")
        .then((res) => {
            let _catalogList = [];
            if(res.Success) {
                for(let i in res.Data) {
                    _catalogList.push(
                        <option key={i} value={res.Data[i].catalog_id}>{res.Data[i].catalog_name}</option>
                    )
                }
            }
            this.setState({catalogList: _catalogList});
        })
    }
    handleChange(event) {
        let name = event.target.name;
        let _info = this.state.info;
        _info[name] = event.target.value;
        if(name == "brand_id") {
            _info['inventory_brand'] = window.jQuery(event.target)[0].selectedOptions[0].innerText;
        }

        if(name == "catalog_id") {
            _info['inventory_catalog'] = window.jQuery(event.target)[0].selectedOptions[0].innerText;
        }
        this.setState({info: _info});
    }

    buildProductDetail() {
        let productDetail = [];
        let product = this.getProduct();
        if(product != null) {
            productDetail.push(
                <div key={1}>
                    <span>Name: {product.name}</span>
                    <span>Price: {product.price}</span>
                    <span>Description: {product.description}</span>
                </div>
            );
        }

        return productDetail;
    }

    getProduct() {
        let product = null;
        if(this.state.Id !== 0) {
            DataUtils.getItem("/api/inventory/item", this.state.Id)
            .then((res) => {
                if(res.Success && res.Data) {
                    this.setState({info: res.Data});
                }
            });
        } else {
            product = {
                id: 0,
                inventory_name: "",
                inventory_img: "",
                inventory_price: 0,
                inventory_catalog: "",
                inventory_brand: "",
                inventory_saleoff: 0,
                inventory_description: ""
            }
        }
        return product;
    }

    getIdFromQueryString() {
        let Obj = null;
        if(this.props.location && this.props.location.search) {
            Obj = queryString.parse(this.props.location.search);
        }
        if(Obj.id !== undefined) {
            Obj.id = parseInt(Obj.id);
        }
        return Obj.id !== undefined?Obj.id:null;
    }

    editHandle(event) {
        this.setState({isEdit: true});
    }
    removeHandle(event) {
        //DataUtils.remove("/api/inventory/delete", this.state.info.inventory_id);
        if(!this.state.info.inventory_id)
        return;

    DataUtils.remove("/api/inventory/delete", this.state.info.inventory_id)
    .then((res)=>{
        if(res.Success) {
            window.jQuery.toast({
                heading: 'Thành Công',
                text: 'Xóa sản phẩm thành công.',
                showHideTransition: 'slide',
                position: 'bottom-right',
                icon: 'success',
            });
            setTimeout((e)=>{window.location.href="/product"}, 1000);
        } else {
            window.jQuery.toast({
                heading: 'Lỗi',
                text: 'Xóa sản phẩm thất bại.',
                showHideTransition: 'slide',
                position: 'bottom-right',
                icon: 'error'
            })
        }
    });
    }
    saveHandle(event) {
        let api = "/api/inventory/update";
        let saveData = this.state.info;
        if(this.state.Id == 0) { 
            api = "/api/inventory/create";
            saveData['id'] = 0;
            delete saveData['inventory_id'];
        } else {
            saveData['id'] = saveData['inventory_id'];
            //delete saveData['inventory_id'];
        }

        DataUtils.save(api, saveData)
        .then((res)=>{
            let msg = "Cập nhật ";
            if(this.state.info.id == 0) {
                msg = "Tạo mới "
            }
            if(res.Success) {
                window.jQuery.toast({
                    heading: 'Thành Công',
                    text: msg + 'sản phẩm thành công.',
                    showHideTransition: 'slide',
                    position: 'bottom-right',
                    icon: 'success',
                });
                setTimeout((e)=>{window.location.href="/product"}, 1000);
            } else {
                window.jQuery.toast({
                    heading: 'Lỗi',
                    text: msg + 'sản phẩm thất bại.',
                    showHideTransition: 'slide',
                    position: 'bottom-right',
                    icon: 'error'
                })
            }
        });
    }

    onImageChange(res) {
        if(res.Success) {
            console.log(222)
            //let imgPath = "http://gunivn.com/guni/"+res.Data.filepath;
            let _info = this.state.info;
            _info['inventory_img'] = "http://gunivn.com/guni/"+res.Data.filepath;
            //imgPath;
            this.setState({info: _info});
        }
    }

    buildEditProductTemplate()
    {
        const formInstance = (
            <form>
              <FieldGroup
                id="formControlsText"
                type="text"
                name="inventory_name"
                label="Tên Sản Phẩm"
                placeholder="Nhập tên sản phẩm"
                defaultValue={this.state.info.inventory_name}
                onChange= {this.handleChange}
              />
              <UploadFile label="Ảnh Sản Phẩm" onChange={this.onImageChange.bind(this)} />

              {/*<FieldGroup
                id="formControlsType"
                type="text"
                name="inventory_catalog"
                label="Danh Mục Sản Phẩm"
                placeholder="Nhập danh mục sản phẩm"
                defaultValue={this.state.info.inventory_catalog}
                onChange= {this.handleChange}
              />*/}

              {/*<FieldGroup
                id="formControlsBrand"
                type="text"
                name="inventory_brand"
                label="Thương Hiệu"
                placeholder="Nhập thương hiệu"
                defaultValue={this.state.info.inventory_brand}
                onChange= {this.handleChange}
              />*/}


               <FormGroup controlId={"formControlsCatalog"}>
                <ControlLabel>Danh Mục Sản Phẩm</ControlLabel>
                    <FormControl onChange= {this.handleChange} defaultValue={this.state.info.catalog_id} name="catalog_id" componentClass="select" placeholder="Nhập danh mục sản phẩm">
                        {this.state.catalogList}
                    </FormControl>  
                </FormGroup>

              <FormGroup controlId={"formControlsBrand"}>
                <ControlLabel>Thương Hiệu</ControlLabel>
                    <FormControl onChange= {this.handleChange} defaultValue={this.state.info.brand_id} name="brand_id" componentClass="select" placeholder="Nhập thương hiệu">
                        {this.state.brandList}
                    </FormControl>  
                </FormGroup>

              <FieldGroup
                id="formControlsPrice"
                type="number"
                name="inventory_price"
                label="Giá Sản Phẩm"
                placeholder="Nhập Giá Sản Phẩm"
                value={this.state.info.inventory_price}
                onChange= {this.handleChange}
              />

              <FieldGroup
                id="formControlsSaleoff"
                type="number"
                name="inventory_saleoff"
                label="Giảm Giá"
                placeholder="Nhập Phần Trăm"
                value={this.state.info.inventory_saleoff}
                onChange= {this.handleChange}
              />
              <FormGroup controlId="formControlsDescription">
                <ControlLabel>Mô Tả</ControlLabel>
                <FormControl name="inventory_description" onChange= {this.handleChange} defaultValue={this.state.info.inventory_description} componentClass="textarea" placeholder="textarea" />
              </FormGroup>  
              <Button type="button" onClick={this.saveHandle.bind(this)} bsStyle="primary">Lưu</Button>
            </form>
          );

          return formInstance;
    }

    buildImage() {
        let imageTemplate = [];
        if(this.state.info !== null) {
            imageTemplate.push(
                <div key={1}>
                    <Image className="product-image" src={this.state.info.inventory_img} responsive />
                </div>
            )
        }
        return imageTemplate;
    }

    buidDescription() {
        let desTemplate = [];
        if(this.state.info != null) {
            let salesOffPrice = parseFloat(this.state.info.inventory_price) * (parseFloat(this.state.info.inventory_saleoff)*0.01);
            let salesPrice = parseFloat(this.state.info.inventory_price) - salesOffPrice;
            let salePriceTemp = (<CurrencyFormat value={salesPrice} decimalSeparator={'.'} displayType={'text'} thousandSeparator={','} suffix={' đ'} />);
            let HeaderProduct = (
                <div>
                    <span>{this.state.info.inventory_name}</span>
                    <span className="product-detail-tool product-detail-edit"><a href="javascript:void(0)" onClick={this.editHandle.bind(this)}>Chỉnh Sửa</a></span>
                    <span className="product-detail-tool product-detail-delete"><a href="javascript:void(0)" onClick={this.removeHandle.bind(this)}>Xóa</a></span>
                </div>
            );

            desTemplate.push(
                <div key={1}>
                    <ListGroup>
                        <ListGroupItem className="product-detail-des-name" header={HeaderProduct}>
                            <span>Thương hiệu: <span className="product-detail-des-company">{this.state.info.inventory_brand}</span></span>
                        </ListGroupItem>
                        <ListGroupItem className="product-detail-des-price" header={salePriceTemp}>
                            <span>
                                Tiết kiệm: <span className="product-detail-des-saleoff">{parseFloat(this.state.info.inventory_saleoff)} %</span>
                                <span>
                                    <CurrencyFormat 
                                        value={salesOffPrice} 
                                        decimalSeparator={'.'} 
                                        displayType={'text'} 
                                        thousandSeparator={','} suffix={' đ'} 
                                        renderText={value => <span> ({value})</span>} 
                                    />
                                </span>
                            </span>
                            <span>Gía thị trường: &nbsp;
                                <span>
                                    <CurrencyFormat value={(parseFloat(this.state.info.inventory_price))} decimalSeparator={'.'} displayType={'text'} thousandSeparator={','} suffix={' đ'} />
                                </span>
                            </span>
                        </ListGroupItem>
                        <ListGroupItem header="">
                            <span dangerouslySetInnerHTML={{__html:this.state.info.inventory_description}}></span>
                        </ListGroupItem>
                    </ListGroup>
                </div>
            );
        }
        return desTemplate;
    }

    render() {

        if(this.state.isEdit === true) {
            let editTemplate = this.buildEditProductTemplate();
            return (
                <div>
                    <Panel className="page-panel product-detail" bsStyle="info">
                        <Panel.Heading>
                            <Panel.Title componentClass="h3">User Management</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                            <Grid fluid={false}>
                                <Row className="show-grid">
                                <Col className="product-edit" xs={12} sm={12} md={12}>
                                    {editTemplate}
                                </Col>
                            </Row>
                            </Grid>
                        </Panel.Body>
                    </Panel>
                </div>
            );
        }
        let imageTemplate = this.buildImage();
        let desTemplate = this.buidDescription();
        return (
            <div className="product-detail">
                <Grid fluid={false}>
                    <Row className="show-grid">
                        <Col className="product-detail-img" xs={12} sm={6} md={6}>
                            {imageTemplate}
                        </Col>
                        <Col className="product-detail-des" xs={12} sm={6} md={6}>
                            {desTemplate}
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default ProductDetail;


