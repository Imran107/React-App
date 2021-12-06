import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js';

class TodoApp extends Component{
    render(){
        return(
            <div className="MyTodoApp">
                <Router>
                    <>
                    <HeaderComponent/>
                    <Switch>
                        <Route path="/" exact component={LoginComponent}/>
                        <Route path="/login" component={LoginComponent}/>
                        <Route path="/welcome/:name" component={WelcomeComponent}/>
                        <Route path="/todos" component={ListTodosComponent}/>
                        <Route path="/logout" component={LogoutComponent}/>
                        <Route component={ErrorComponent}/>
                    </Switch>
                    <FooterComponent/>
                    </>
                </Router>
            </div>
        );
    }
}

class HeaderComponent extends Component{
    render(){
        return(
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="http://www.in28minutes.com" className="navbar-brand">in28minutes</a></div>
                    <ul className="navbar-nav">
                        <li><Link className="nav-link" to="/welcome/in28minutes">Home</Link></li>
                        <li><Link className="nav-link" to="/todos">Todos</Link></li>
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        <li><Link className="nav-link" to="/login">Login</Link></li>
                        <li><Link className="nav-link" to="/logout">Logout</Link></li>
                    </ul>
                </nav>
            </header>
            
        );
    }
}


class FooterComponent extends Component{
    render(){
        return(
            <footer className="footer">
                <span className="text-muted"> All Right(s) reserved </span>
            </footer>
        );
    }
}

class LogoutComponent extends Component{
    render(){
        return(
            <> 
              <h1>You are logged out.</h1>
              <div className="container">
                  Thank you for using our application.
              </div>
            </>
        );
    }
}


class ListTodosComponent extends Component{

    constructor(props){
        super(props)
        this.state = {
            todos : [
                    {id:1, description: "Learn React", done:false, targetDate: new Date()},
                    {id:2, description: "Learn MVC", done:false, targetDate: new Date()},
                    {id:3, description: "Learn Spring Boot", done:false, targetDate: new Date()}
                   ]
        }
    }
    render(){
        return (
                <div> 
                    <h1>List Todos</h1>
                    <div className="container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th>Is Completed</th>
                                    <th>Target Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.todos.map(
                                        todo =>
                                        <tr>
                                            <td>{todo.description}</td>
                                            <td>{todo.done.toString()}</td>
                                            <td>{todo.targetDate.toString()}</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            )
    }
}

function ErrorComponent(){
    return <div> Error: Please contact support </div>
}

class WelcomeComponent extends Component{
    render(){
        return (
            <>
                <h1>Welcome</h1>
                <div className="container"> 
                    Welcome {this.props.match.params.name}. You can manage your todos by <Link to="/todos">Clicking here</Link>
                </div>
            </>
        );
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
            AuthenticationService.registerSuccesfulLogin(this.state.username, this.state.password);
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
                <h1>Login</h1>
                <div className="container">
                {/*<ShowLoginFailedMessage hasLoginFailed={this.state.hasLoginFailed}/>*/}
                {/*<ShowLoginSuccessMessage showSuccessMessage={this.state.showSuccessMessage}/>*/}
                {this.state.hasLoginFailed && <div className="alert alert-warning"> Invalid Credentials!</div>}
                {this.state.showSuccessMessage && <div> Login Succeeded</div>}
                User Name : <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                Password : <input type="password" name="password" onChange={this.handleChange}/>
                <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                </div>
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