class AuthenticationService{
    registerSuccesfulLogin(username, password){
        console.log('registerSuccesfulLogin');
        sessionStorage.setItem('authenticatedUser', username)
    }

}
export default new AuthenticationService()