import React, { Component } from 'react';
import './App.css';
import UserDetails from './components/UserDetails';

class App extends Component {
  render() {
    return (
      <div className="App">
       <UserDetails />
      </div>
   );
  }
}

export default App;
