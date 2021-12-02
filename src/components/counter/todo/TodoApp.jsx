import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

class TodoApp extends Component{
    render(){
        return(
            <div className="MyTodoApp">
                <Router>
                    <>
                    <Switch>
                    <Route path="/" exact component={LoginComponent}/>
                    <Route path="/login" component={LoginComponent}/>
                    <Route path="/welcome/:name" component={WelcomeComponent}/>
                    <Route component={ErrorComponent}/>
                    </Switch>
                    </>
                </Router>
            </div>
        );
    }
}

function ErrorComponent(){
    return <div> Error: Please contact support </div>
}

class WelcomeComponent extends Component{
    render(){
        return <div> Welcome {this.props.match.params.name} </div>
    }
}

class LoginComponent extends Component{

    constructor(props){
        super(props);
        this.state = {
            username : "in28minutes",
            password : "",
            hasLoginFailed : false,
            showSuccessMessage : false
        }

        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
        //let navigate = useNavigate();
    }

    handleChange(event){
        console.log(this.state);
        this.setState({
            [event.target.name]:event.target.value
        });
    }
    
    loginClicked(){
        if(this.state.username === 'in28minutes' && this.state.password ==='dummy'){
            this.props.history.push(`/welcome/${this.state.username}`)
            //this.setState({hasLoginFailed : false})
            //this.setState({showSuccessMessage : true})
        }else{
            this.setState({hasLoginFailed : true})
            this.setState({showSuccessMessage : false})
        }
    }

    render(){
        return(
            <div>
                {/*<ShowLoginFailedMessage hasLoginFailed={this.state.hasLoginFailed}/>*/}
                {/*<ShowLoginSuccessMessage showSuccessMessage={this.state.showSuccessMessage}/>*/}
                {this.state.hasLoginFailed && <div> Invalid Credentials!</div>}
                {this.state.showSuccessMessage && <div> Login Succeeded</div>}
                User Name : <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                Password : <input type="password" name="password" onChange={this.handleChange}/>
                <button onClick={this.loginClicked}>Login</button>
            </div>
        );
    }
}

function ShowLoginFailedMessage(props){
    if(props.hasLoginFailed){
        return <div> Invalid Credentials!</div>
    }
    return null;
}

function ShowLoginSuccessMessage(props){
    if(props.showSuccessMessage){
        return <div> Login Succeeded</div>
    }
    return null;
}

export default TodoApp