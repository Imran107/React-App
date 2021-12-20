import axios from 'axios'

class HelloWorldService{

    executeHelloWorldService(){
        return axios.get('http://localhost:8085/hello-world');
    }

    executeHelloWorldBeanService(){
        return axios.get('http://localhost:8085/hello-world-bean');
    }

    executeHelloWorldPathVariableService(name){
        return axios.get(`http://localhost:8085/hello-world-bean/path-variable/${name}`);
    }

}

export default new HelloWorldService()