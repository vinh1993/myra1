import React from 'react';
import {Panel,Grid, Row, Col, Breadcrumb} from 'react-bootstrap';

import MenuCatalog from './MenuCatalog';
import ProducList from './ProductList';

import './Index.css';

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            path: "",
            type: 0
        };

        if(this.props.type != undefined) {
            this.state.type = this.props.type;
        }
    }

    onMenuClick(id) {
        this.setState({
            type: id
        });
    }

    buildBreadcrumb() {
        let template = [];
        template.push(
            <Breadcrumb.Item key={0} href="/">Trang Chủ</Breadcrumb.Item>
        )
        if(this.state.path != "") {
            template.push(
                <Breadcrumb.Item key={1} href="#">Trang Chủ</Breadcrumb.Item>
            )
        }
        return template;
    }
    render() {
        let breadcrumb = this.buildBreadcrumb();
        return (
        <div>
            <Panel bsStyle="info" className="app-product">
                <Panel.Heading>
                <Panel.Title>
                    <Breadcrumb>
                        {breadcrumb}
                    </Breadcrumb>
                </Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    
                    <Grid fluid={true}>
                        <Row className="app-product-list">
                            <Col xs={12} md={3} sm={3}>
                                <MenuCatalog onMenuClick={this.onMenuClick.bind(this)} />
                            </Col>
                            <Col xs={12} md={9} sm={9}>
                                <ProducList type={this.state.type} />
                            </Col>
                        </Row>
                    </Grid>
                    

                </Panel.Body>
            </Panel>

            
        </div>);
    }
}

export default Index;