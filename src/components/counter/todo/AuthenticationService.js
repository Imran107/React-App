class AuthenticationService{
    registerSuccesfulLogin(username, password){
        sessionStorage.setItem('authenticatedUser', username)
    }

}
export default AuthenticationService()