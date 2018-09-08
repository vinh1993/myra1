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
        this.state.info = this.getCatalog(id);
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
    getCatalog(id) {
        if(id !== 0) {
            DataUtils.getItem("/api/catalog/item", id)
            .then((res)=>{if(res.Success){this.setState({info:res.Data})}});
            return null;
        } else {
            return {
                "id": 0,
                "catalog_name": "",
                "catalog_description": ""
            };
        }
    }
    saveHandle() {
        let api = "/api/catalog/update";
        let saveData = this.state.info;
        if(this.state.info.id == 0) { 
            api = "/api/catalog/create";
            saveData['id'] = 0;
        } else {
            saveData['id'] = saveData['catalog_id'];
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
                    text: msg + 'danh mục thành công.',
                    showHideTransition: 'slide',
                    position: 'bottom-right',
                    icon: 'success',
                });
                setTimeout((e)=>{window.location.href="/cataloglist"}, 1000);
            } else {
                window.jQuery.toast({
                    heading: 'Lỗi',
                    text: msg + 'danh mục thất bại.',
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
        if(!this.state.info.catalog_id)
            return;
        DataUtils.remove("/api/catalog/delete", this.state.info.catalog_id)
        .then((res)=>{
            if(res.Success) {
                window.jQuery.toast({
                    heading: 'Thành Công',
                    text: 'Xóa danh mục thành công.',
                    showHideTransition: 'slide',
                    position: 'bottom-right',
                    icon: 'success',
                });

                setTimeout((e)=>{window.location.href="/cataloglist"}, 1000);
            } else {
                window.jQuery.toast({
                    heading: 'Lỗi',
                    text: 'Xóa danh mục thất bại.',
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
        console.log(35, name)
        let _info = this.state.info;
        _info[name] = event.target.value;
        this.setState({info: _info});
    }
    buildCreateForm()
    {
        const formInstance = (
            <form id="uploadForm" encType="multipart/form-data">
                <FieldGroup
                id="formControlsName"
                name="catalog_name"
                type="text"
                label="Tên Danh Mục"
                defaultValue={this.state.info.catalog_name}
                placeholder="Nhập tên danh mục"
                onChange={this.handleChange}
                />
                <FormGroup controlId="formControlsDescription">
                    <ControlLabel>Mô Tả</ControlLabel>
                    <FormControl onChange={this.handleChange} defaultValue={this.state.info.catalog_description} name="catalog_description" componentClass="textarea" placeholder="textarea" />
                </FormGroup>
                <Button type="button" onClick={this.saveHandle.bind(this)}>Lưu</Button>
            </form>
            );

        return formInstance;
    }
    buidDescription() {
        let desTemplate = [];
        if(this.state.info != null) {
            let Headerbrand = (
                <div>
                    <span>{this.state.info.brand_name}</span>
                    <span className="catalog-detail-tool catalog-detail-edit"><a href="javascript:void(0)" onClick={this.editHandle.bind(this)}>Chỉnh Sửa</a></span>
                    <span className="catalog-detail-tool catalog-detail-delete"><a href="javascript:void(0)" onClick={this.removeHandle.bind(this)}>Xóa</a></span>
                </div>
            );

            desTemplate.push(
                <div key={1}>
                    <ListGroup>
                        <ListGroupItem className="catalog-detail-des-name" header={Headerbrand}>
                            <span>Tên Danh Mục: <span className="catalog-detail-des-company">{this.state.info.catalog_name}</span></span>
                        </ListGroupItem>
                        <ListGroupItem header="">
                            <h3><strong>Mô Tả</strong></h3>
                            <span dangerouslySetInnerHTML={{__html:this.state.info.catalog_description}}></span>
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
                        <Panel.Title componentClass="h3">Thêm Mới Danh Mục</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                            <Grid fluid={false}>
                                <Row className="show-grid">
                                    <Col className="catalog-detail-img" xs={12} sm={12} md={12}>
                                        {template}
                                    </Col>
                                </Row>
                            </Grid>
                        </Panel.Body>
                    </Panel>
                </div>
            );
        }
        let desTemplate = this.buidDescription();
        return (
            <div className="brand-detail">
                <Grid fluid={false}>
                    <Row className="show-grid">
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


