import React from 'react';

class Clock extends React.Component {
    constructor(props) {
        super(props);
        //Khởi tạo một trạng thái thuộc tính date
        this.state = {date: new Date()};
    }
    componentDidMount() {
        alert("Component already rendered.");
    }
    componentDidUpdate(props, state) {
        console.log(props, state)
        if(state.date != this.state.date) {
            alert("Current date: " + this.state.date.toLocaleTimeString());
        }
    }
    componentWillUnmount() {
        alert(134);
    }
    onClick() {
        //Thay đổi trạng thái của thuộc tính date
        this.setState({date: new Date()});
    }
    render() {
        return (
            <div>
                <h1>Hello, {this.props.name}!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
                <button onClick={this.onClick.bind(this)}>Update Time</button>
            </div>
        );
    }
}

export default Clock;
