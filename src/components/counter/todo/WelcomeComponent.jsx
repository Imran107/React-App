import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class WelcomeComponent extends Component{

    constructor(props){
        super(props)

        this.getCustomizedMessage = this.getCustomizedMessage.bind(this)
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
                   <button className="btn btn-success" onClick={this.getCustomizedMessage}> Get Message</button>
                </div>
            </>
        );
    }

    getCustomizedMessage(){
        console.log('');
    }
}