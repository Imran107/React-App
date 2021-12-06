import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'

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
                    <div><a className="navbar-brand">in28minutes</a></div>
                    <ul className="navbar-nav">
                        <li className="nav-link">Home</li>
                        <li className="nav-link">Todos</li>
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        <li className="nav-link">Login</li>
                        <li className="nav-link">Logout</li>
                    </ul>
                </nav>
            </header>
            
        );
    }
}


class FooterComponent extends Component{
    render(){
        return(
            <div> 
                <hr/> Footer
            </div>
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
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
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
                                        <td>{todo.id}</td>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{todo.targetDate.toString()}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            )
    }
}

function ErrorComponent(){
    return <div> Error: Please contact support </div>
}

class WelcomeComponent extends Component{
    render(){
        return <div> Welcome {this.props.match.params.name}. You can manage your todos by <Link to="/todos">Clicking here</Link></div>
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