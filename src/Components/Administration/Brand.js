import React from 'react';
import queryString from 'query-string';
import DataUtils from '../../Utils/DataUtils';


import {
    Grid, Row, 
    Col, Image, 
    ListGroup, ListGroupItem, 
    Button, FormGroup, HelpBlock,
    ControlLabel, FormControl,
    Panel
} from 'react-bootstrap';

import UploadFile from './UploadFile';

function FieldGroup({ id, label, help, ...props}) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class Brand extends React.Component {
    constructor(props) {
        super(props);
        this.state = {info: null, isEdit: false};

        let id = this.getIdFromQueryString();
        if(!id) {
            this.state.isEdit = true;
        }
        this.handleChange = this.handleChange.bind(this);
        this.state.info = this.getBrand(id);
    }
    getIdFromQueryString() {
        let Obj = null;
        if(this.props.location && this.props.location.search) {
            Obj = queryString.parse(this.props.location.search);
        }
        if(Obj && Obj.id !== undefined) {
            Obj.id = parseInt(Obj.id);
        }
        return Obj&&Obj.id !== undefined?Obj.id:null;
    }
    getBrand(id) {
        if(id !== 0) {
            DataUtils.getItem("/api/brand/item", id)
            .then((res)=>{if(res.Success){this.setState({info:res.Data})}});
            return null;
        } else {
            return {
                "id": 0,
                "brand_name": "",
                "brand_company": "",
                "brand_logo": "",
                "brand_description": ""
            };
        }
    }
    saveHandle() {
        let api = "/api/brand/update";
        let saveData = this.state.info;
        if(this.state.info.id == 0) { 
            api = "/api/brand/create";
            saveData['id'] = 0;
            delete saveData['brand_id'];
        } else {
            saveData['id'] = saveData['brand_id'];
            delete saveData['brand_id'];
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
                    text: msg + 'thương hiệu thành công.',
                    showHideTransition: 'slide',
                    position: 'bottom-right',
                    icon: 'success',
                });
                setTimeout((e)=>{window.location.href="/brandlist"}, 1000);
            } else {
                window.jQuery.toast({
                    heading: 'Lỗi',
                    text: msg + 'thương hiệu thất bại.',
                    showHideTransition: 'slide',
                    position: 'bottom-right',
                    icon: 'error'
                })
            }
        });
    }
    editHandle(){
        this.setState({isEdit: true});
    }
    removeHandle() {
        if(!this.state.info.brand_id)
            return;
        DataUtils.remove("/api/brand/delete", this.state.info.brand_id)
        .then((res)=>{
            if(res.Success) {
                window.jQuery.toast({
                    heading: 'Thành Công',
                    text: 'Xóa thương hiệu thành công.',
                    showHideTransition: 'slide',
                    position: 'bottom-right',
                    icon: 'success',
                });
                setTimeout((e)=>{window.location.href="/brandlist"}, 1000);
            } else {
                window.jQuery.toast({
                    heading: 'Lỗi',
                    text: 'Xóa thương hiệu thất bại.',
                    showHideTransition: 'slide',
                    position: 'bottom-right',
                    icon: 'error'
                })
            }
        });
    }
    //Handle Change for input
    handleChange(event) {
        let name = event.target.name;
        let _info = this.state.info;
        _info[name] = event.target.value;
        this.setState({info: _info});
    }
    //Handle change for upload image
    onUploadChange(res) {
        if(res.Success) {
            let _info = this.state.info;
            _info['brand_logo'] = "http://gunivn.com/guni/"+res.Data.filepath;
            this.setState(_info);
        }
    }
    buildCreateForm()
    {
        const formInstance = (
            <form id="uploadForm" encType="multipart/form-data">
                <FieldGroup
                id="formControlsName"
                name="brand_name"
                type="text"
                label="Tên Thương Hiệu"
                defaultValue={this.state.info.brand_name}
                placeholder="Nhập tên thương hiệu"
                onChange={this.handleChange}
                />
                <FieldGroup
                    id="formControlsCompany"
                    name="brand_company"
                    type="text"
                    label="Công Ty"
                    defaultValue={this.state.info.brand_company}
                    placeholder="Nhập coong ty"
                    onChange={this.handleChange}
                />
                <Image id="logo" src={this.state.info.brand_logo} />
                <UploadFile label="Logo" onChange={this.onUploadChange.bind(this)}/>
                <FormGroup controlId="formControlsDescription">
                    <ControlLabel>Mô Tả</ControlLabel>
                    <FormControl defaultValue={this.state.info.brand_description} name="brand_description" componentClass="textarea" placeholder="textarea" />
                </FormGroup>
                <Button type="button" onClick={this.saveHandle.bind(this)}>Lưu</Button>
            </form>
            );

        return formInstance;
    }

    buildImage() {
        let imageTemplate = [];
        if(this.state.info !== null) {
            imageTemplate.push(
                <div key={1}>
                    <Image className="brand-image" src={this.state.info.brand_logo} responsive />
                </div>
            )
        }
        return imageTemplate;
    }

    buidDescription() {
        let desTemplate = [];
        if(this.state.info != null) {
            let Headerbrand = (
                <div>
                    <span>{this.state.info.brand_name}</span>
                    <span className="brand-detail-tool brand-detail-edit"><a href="javascript:void(0)" onClick={this.editHandle.bind(this)}>Chỉnh Sửa</a></span>
                    <span className="brand-detail-tool brand-detail-delete"><a href="javascript:void(0)" onClick={this.removeHandle.bind(this)}>Xóa</a></span>
                </div>
            );

            desTemplate.push(
                <div key={1}>
                    <ListGroup>
                        <ListGroupItem className="brand-detail-des-name" header={Headerbrand}>
                            <span>Công ty: <span className="brand-detail-des-company">{this.state.info.brand_company}</span></span>
                        </ListGroupItem>
                        <ListGroupItem header="">
                            <span dangerouslySetInnerHTML={{__html:this.state.info.brand_description}}></span>
                        </ListGroupItem>
                    </ListGroup>
                </div>
            );
        }
        return desTemplate;
    }
    render() {

        if(this.state.isEdit == true) {
            let template = this.buildCreateForm();
            return (
                <div>
                    <Panel className="page-panel" bsStyle="info">
                        <Panel.Heading>
                        <Panel.Title componentClass="h3">Thêm Mới Thương Hiệu</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                            <Grid fluid={false}>
                                <Row className="show-grid">
                                    <Col className="brand-detail-img" xs={12} sm={12} md={12}>
                                        {template}
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
            <div className="brand-detail">
                <Grid fluid={false}>
                    <Row className="show-grid">
                        <Col className="brand-detail-img" xs={12} sm={6} md={6}>
                            {imageTemplate}
                        </Col>
                        <Col className="brand-detail-des" xs={12} sm={6} md={6}>
                            {desTemplate}
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Brand;


