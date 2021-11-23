import React, { Component } from 'react';
import logo from './logo.svg';
import FirstComponent from './components/leaning examples/FirstComponent';
import SecondComponent from './components/leaning examples/SecondComponent';
import './App.css';
import ThirdComponent from './components/leaning examples/ThirdComponent';
 
class App extends Component {
  render() {
    return (
      <div className="App">
        Hello World
        <FirstComponent></FirstComponent>
        <SecondComponent></SecondComponent>
        <ThirdComponent></ThirdComponent>
      </div>
    );
  }
}





export default App;