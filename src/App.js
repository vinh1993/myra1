import React from 'react';
import AppRouter from './Components/AppRouter';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

    return (
      <div>
        <AppRouter />
      </div>
    );
  }
}

export default App;
