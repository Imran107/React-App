import axios from 'axios'
import { API_URL } from '../../../Constants'

export const USER_NAME_SESSION_ATTRIBUTE = 'authenticatedUser'

class AuthenticationService{

    /*executeBasicAuthService(username, password){
        return axios.get(`${API_URL}/basicauth`, {
            headers : {
                authorization : this.createBasicAuthToken(username, password)
            }
        })
    }*/

    executeJWTAuthService(username, password){
        return axios.post(`${API_URL}/authenticate`, {
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
        //sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE, username)

         //For every request we are adding Basic authorization
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password))
    }

    registerSuccesfulLoginForJWT(username, token){
        console.log('registerSuccesfulLoginForJWT');
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE, username) 
        
        //For every request we are adding JWT authorization
        this.setupAxiosInterceptors(this.createJWTAuthToken(token))
    }

    logout(){
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE);
    }

    isUserLoggerIn(){
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE);
        if(user === null)
            return false;
        else
            return true;
    }

    getLoggedInUserName(){
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE);
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