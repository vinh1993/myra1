import React, { Component } from 'react';

import { 
    Form, 
    FormGroup, 
    Col, 
    FormControl, 
    ControlLabel, 
    Checkbox, 
    Button,
    Grid,
    Row
} from 'react-bootstrap';

import './Styles/LoginForm.css';

import DataUtils from '../Utils/DataUtils';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {loginname: "", password: ""},
            logged: false
        };

        let session = this.getSession();
        if(session !== null) {
            this.state.logged = true;
        }
        this.onKeyDownHandle = this.onKeyDownHandle.bind(this);
    }
    componentWillMount(event) {
        if(this.state.logged === true) {
            window.location.href = "/admin";
        }
    }
    getSession() {
        let session = window.localStorage.getItem("session");
        if(session != null) {
            return JSON.parse(session);
        }
        return null;
    }
    onSubmit(event, keyCode) {
        if(this.state.loginname === "" || this.state.data.password === "")  {
            alert("Invalid data");
        } else {

            let userInfo = DataUtils.checkUser(this.state.data.loginname, this.state.data.password);

            if(userInfo != null) {
                window.localStorage.setItem("session", JSON.stringify(userInfo));
                window.location.href="/admin";
            }
        }
    }
    onKeyDownHandle(event) {
        if(event.keyCode === 13) {
            this.onSubmit(event, 13);
        }
    }
    onHandle(event) {
        let newState = {
            data: this.state.data
        };

        let inputName = event.target.name;
        newState.data[inputName] = event.target.value;
        
        this.setState(newState);
    }
    render() {
        if(this.state.logged === true) {
            return (<div></div>);
        }
        return (
           


<div className="login-wrap">
        <div className="login-html">
          <input id="tab-1" type="radio" name="tab" className="sign-in" defaultChecked /><label htmlFor="tab-1" className="tab">Sign In</label>
          <input id="tab-2" type="radio" name="tab" className="sign-up" /><label htmlFor="tab-2" className="tab">Sign Up</label>
          <div className="login-form">
            <div className="sign-in-htm">
              <div className="group">
                <label htmlFor="user1" className="label">Mail</label>
                <input  type="text" className="input" onKeyUp={this.onKeyDownHandle} name="loginname" onChange={this.onHandle.bind(this)} type="email" value={this.state.data.loginname} placeholder="Email" />
              </div>
              <div className="group">
                <label htmlFor="pass" className="label">Password</label>
                <input  type="password" className="input" data-type="password" onKeyUp={this.onKeyDownHandle} name="password" onChange={this.onHandle.bind(this)} type="password" value={this.state.data.password} placeholder="Password" />
              </div>
              <div className="group">
                <input id="check" type="checkbox" className="check" defaultChecked />
                <label htmlFor="check"><span className="icon" /> Keep me Signed in</label>
              </div>
              <div className="group">
                <input type="submit" className="button" defaultValue="Sign In" onClick={this.onSubmit.bind(this)} />
              </div>
              <div className="hr" />
              <div className="foot-lnk">
                <a href="#forgot">Forgot Password?</a>
              </div>
            </div>
            <div className="sign-up-htm">
              <div className="group">
                <label htmlFor="user1" className="label">Username</label>
                <input  type="text" className="input" />
              </div>
              <div className="group">
                <label htmlFor="pass1" className="label">Password</label>
                <input  type="password" className="input" data-type="password" />
              </div>
              <div className="group">
                <label htmlFor="pass1" className="label">Repeat Password</label>
                <input  type="password" className="input" data-type="password" />
              </div>
              <div className="group">
                <label htmlFor="pass1" className="label">Email Address</label>
                <input  type="text" className="input" />
              </div>
              <div className="group">
                <input type="submit" className="button" defaultValue="Sign Up" />
              </div>
              <div className="hr" />
              <div className="foot-lnk">
                <label htmlFor="tab-1">Already Member?
                </label></div>
            </div>
          </div>
        </div>
      </div>
        );
    }
}

export default LoginForm;
/*
<Form horizontal className="app-login-form">
            <Grid>
                <Row className="show-grid">
                    <Col xs={0} md={4} sm={3} lg={4}></Col>
                    <Col xs={12} md={4} sm={6} lg={4}>
                            <FormGroup controlId="formHorizontalEmail">
                                <Col componentClass={ControlLabel} sm={3}>
                                    Email
                                </Col>
                                <Col sm={9}>
                                    <FormControl onKeyUp={this.onKeyDownHandle} name="loginname" onChange={this.onHandle.bind(this)} type="email" value={this.state.data.loginname} placeholder="Email" />
                                </Col>
                            </FormGroup>
                    </Col>
                    <Col xs={12} md={4} sm={3} lg={4}></Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={0} md={4} sm={3} lg={4}></Col>
                    <Col xs={12} md={4} sm={6} lg={4}>
                            <FormGroup controlId="formHorizontalPassword">
                                <Col componentClass={ControlLabel} sm={3}>
                                    Password
                                </Col>
                                <Col sm={9}>
                                    <FormControl onKeyUp={this.onKeyDownHandle} name="password" onChange={this.onHandle.bind(this)} type="password" value={this.state.data.password} placeholder="Password" />
                                </Col>
                            </FormGroup>
                    </Col>
                    <Col xs={12} md={4} sm={3} lg={4}></Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={0} md={4} sm={3} lg={4}></Col>
                    <Col xs={12} md={4} sm={6} lg={4}>
                      
                            <FormGroup>
                                <Col smOffset={3} sm={10}>
                                    <Checkbox>Remember me</Checkbox>
                                </Col>
                            </FormGroup>
                    </Col>
                    <Col xs={12} md={4} sm={3} lg={4}></Col>
                </Row>
                <Row>
                    <Col xs={0} md={4} sm={3} lg={4}></Col>
                    <Col xs={12} md={3} sm={6} lg={3}>
                        <Button className="btn-signin" type="button" onClick={this.onSubmit.bind(this)}>Sign in</Button>
                    </Col>
                                           
                    <Col xs={12} md={4} sm={3} lg={4}></Col>
                </Row>
            </Grid>
            </Form>
            */