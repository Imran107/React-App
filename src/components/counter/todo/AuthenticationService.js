import axios from 'axios'

class AuthenticationService{
    registerSuccesfulLogin(username, password){
        let basicAuthHeader = 'Basic ' + window.btoa(username+":"+password)
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