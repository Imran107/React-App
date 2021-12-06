class AuthenticationService{
    registerSuccesfulLogin(username, password){
        console.log('registerSuccesfulLogin');
        sessionStorage.setItem('authenticatedUser', username)
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

}
export default new AuthenticationService()