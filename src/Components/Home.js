import React from 'react';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {logged: true};
  }
  render() {
    return (
      <div>
        Home Component
      </div>
    );
  }
}

export default Home;
