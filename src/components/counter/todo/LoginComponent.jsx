import React, {Component} from 'react'
import AuthenticationService from './AuthenticationService.js';

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
        // if(this.state.username === 'in28minutes' && this.state.password ==='dummy'){
        //     AuthenticationService.registerSuccesfulLogin(this.state.username, this.state.password);
        //     this.props.history.push(`/welcome/${this.state.username}`)
        //     //this.setState({hasLoginFailed : false})
        //     //this.setState({showSuccessMessage : true})
        // }else{
        //     this.setState({hasLoginFailed : true})
        //     this.setState({showSuccessMessage : false})
        // }

        // AuthenticationService.executeBasicAuthService(this.state.username, this.state.password)
        // .then(
        //     () => {
        //         AuthenticationService.registerSuccesfulLogin(this.state.username, this.state.password);
        //         this.props.history.push(`/welcome/${this.state.username}`)
        //     }
        // )
        // .catch(
        //     () => {
        //         this.setState({hasLoginFailed : true})
        //         this.setState({showSuccessMessage : false})
        //     }
        // )

        AuthenticationService.executeJWTAuthService(this.state.username, this.state.password)
        .then(
            (response) => {
                AuthenticationService.registerSuccesfulLoginForJWT(this.state.username, response.data.token);
                this.props.history.push(`/welcome/${this.state.username}`)
            }
        )
        .catch(
            () => {
                this.setState({hasLoginFailed : true})
                this.setState({showSuccessMessage : false})
            }
        )
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

export default LoginComponent
