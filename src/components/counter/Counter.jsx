import React, {Component} from 'react'
import './Counter.css'

class Counter extends Component{

  //Define the initial state in a constructor
  //state => counter 0
  constructor() {
    super(); //Error 1

    this.state = {
        counter : 0
    }

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.reset = this.reset.bind(this);
  }

  render(){
    return (
      <div className="App">
        <CounterButton by={1} incrementMethod={this.increment} decrementMethod={this.decrement}></CounterButton>
        <CounterButton by={5} incrementMethod={this.increment} decrementMethod={this.decrement}></CounterButton>
        <CounterButton by={10} incrementMethod={this.increment} decrementMethod={this.decrement}></CounterButton>
        <span className="count" style={{color:"red"}}>{this.state.counter}</span>
        <div><button className="reset" onClick={this.reset}>Reset</button></div>
      </div>
    );
  }

  increment(by) { 
    console.log(`increment from parent ${by}`);
    this.setState(
    (prevState) => {
          return {counter: prevState.counter + by}
      }
    );
  }

  decrement(by){
    this.setState(
    (prevState) => {
        return {counter : prevState.counter - by}
      }
    );
  }

  reset(){
    this.setState(
      {
        counter : 0
      }
    )
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
      this.decrement = this.decrement.bind(this);
  }
  
  render() {
    return (
        <div className="counter">
        <button onClick={this.increment} >+{this.props.by}</button>
        <button onClick={this.decrement} >-{this.props.by}</button>
        <span className="count" style={{color:"red"}}>{this.state.counter}</span>
        </div>
    )
  }
  
  increment() { //Update state - counter++
    //console.log('increment');
    //this.state.counter++; //Bad Practice
    this.setState(
      (prevState) => {
        return {counter: prevState.counter + this.props.by}
      }
    );

    this.props.incrementMethod(this.props.by)
  }

  decrement(){
    this.setState(
    (prevState) =>  {
        return {counter: prevState.counter - this.props.by}
      }
    );

    this.props.decrementMethod(this.props.by)
   }
  
}


export default Counter