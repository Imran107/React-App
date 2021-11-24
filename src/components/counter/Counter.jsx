import React, {Component} from 'react'
import './Counter.css'

class Counter extends Component{
  render(){
    return (
      <div className="App">
        <CounterButton by={1}></CounterButton>
        <CounterButton by={5}></CounterButton>
        <CounterButton by={10}></CounterButton>
      </div>
    );
  }
}

class CounterButton extends Component {  
  
  //Define the initial state in a constructor
  //state => counter 0
  constructor() {
      super(); //Error 1

      this.state = {
          counter : 0
      }

      this.increment = this.increment.bind(this);
  }
  
  render() {
    return (
        <div className="counter">
        <button onClick={this.increment} >+{this.props.by}</button>
        <span className="count" style={{color:"red"}}>{this.state.counter}</span>
        </div>
    )
  }
  
  increment() { //Update state - counter++
    //console.log('increment');
    //this.state.counter++; //Bad Practice
    this.setState({
        counter: this.state.counter + this.props.by
    });
  }

}


export default Counter