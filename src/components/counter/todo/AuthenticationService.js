import axios from 'axios'

class AuthenticationService{

    /*executeBasicAuthService(username, password){
        return axios.get('http://localhost:8085/basicauth', {
            headers : {
                authorization : this.createBasicAuthToken(username, password)
            }
        })
    }*/

    executeJWTAuthService(username, password){
        return axios.post('http://localhost:8085/authenticate', {
            username,
            password
        })
    }

    createBasicAuthToken(username, password){
        return 'Basic ' + window.btoa(username+":"+password)
    }

    createJWTAuthToken(token){
        return 'Bearer ' + token
    }

    registerSuccesfulLogin(username, password){
        //let basicAuthHeader = this.createBasicAuthToken(username, password)
        //console.log('registerSuccesfulLogin');
        //sessionStorage.setItem('authenticatedUser', username)

         //For every request we are adding Basic authorization
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password))
    }

    registerSuccesfulLoginForJWT(username, token){
        console.log('registerSuccesfulLoginForJWT');
        sessionStorage.setItem('authenticatedUser', username) 
        
        //For every request we are adding JWT authorization
        this.setupAxiosInterceptors(this.createJWTAuthToken(token))
    }

    logout(){
        sessionStorage.removeItem('authenticatedUser');
    }

    isUserLoggerIn(){
        let user = sessionStorage.getItem('authenticatedUser');
        if(user === null)
            return false;
        else
            return true;
    }

    getLoggedInUserName(){
        let user = sessionStorage.getItem('authenticatedUser');
        return user;
    }

    setupAxiosInterceptors(token){
        axios.interceptors.request.use(
            (config) => {
                if(this.isUserLoggerIn()){
                    config.headers.authorization = token
                }
                return config
            }
        )
    }

}
export default new AuthenticationService()