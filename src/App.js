import React, { Component } from 'react';
import logo from './logo.svg';
import FirstComponent from './components/leaning examples/FirstComponent';
import SecondComponent from './components/leaning examples/SecondComponent';
import './App.css';
import ThirdComponent from './components/leaning examples/ThirdComponent';
import Counter from './components/counter/Counter';
 
class App extends Component {
  render() {
    return (
      <div className="App">
        <Counter></Counter>
      </div>
    );
  }
}

class LearningComponent extends Component {
  render() {
    return (
      <div className="learningComponent">
        Hello World
        <FirstComponent></FirstComponent>
        <SecondComponent></SecondComponent>
        <ThirdComponent></ThirdComponent>
      </div>
    );
  }
}





export default App;