import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import HelloWorldService from '../../api/todo/HelloWorldService'

export default class WelcomeComponent extends Component{

    constructor(props){
        super(props)
        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this)
        this.state = {
            welcomeMessage : ''
        }
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this)
    }

    render(){
        return (
            <>
                <h1>Welcome</h1>
                <div className="container"> 
                    Welcome {this.props.match.params.name}. You can manage your todos by <Link to="/todos">Clicking here</Link>
                </div>
                <div className="container"> 
                   Click here to get the customized message 
                   <button className="btn btn-success" onClick={this.retrieveWelcomeMessage}> Get Message</button>
                </div>
                <div className="container"> 
                   {this.state.welcomeMessage}
                </div>
            </>
        );
    }

    retrieveWelcomeMessage(){
        HelloWorldService.executeHelloWorldService()
        .then(response => this.handleSuccessfulResponse(response))
    }

    handleSuccessfulResponse(response){
        this.setState(
            { welcomeMessage:response.data}
        );
    }
}