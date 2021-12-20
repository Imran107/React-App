import axios from 'axios'

class AuthenticationService{

    executeBasicAuthService(username, password){
        return axios.get('http://localhost:8082/basicauth', {
            headers : {
                authorization : this.createBasicAuthToken(username, password)
            }
        })
    }

    createBasicAuthToken(username, password){
        return 'Basic ' + window.btoa(username+":"+password)
    }

    registerSuccesfulLogin(username, password){
        let basicAuthHeader = this.createBasicAuthToken(username, password)
        console.log('registerSuccesfulLogin');
        sessionStorage.setItem('authenticatedUser', username)
        this.setupAxiosInterceptors(basicAuthHeader)
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

    setupAxiosInterceptors(basicAuthHeader){
        axios.interceptors.request.use(
            (config) => {
                if(this.isUserLoggerIn()){
                    config.headers.authorization = basicAuthHeader
                }
                return config
            }
        )
    }

}
export default new AuthenticationService()