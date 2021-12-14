import axios from 'axios'

class TodoDataService{

    retreiveAllTodos(name){
        return axios.get(`http://localhost:8080//users/${name}/todos`);
    }

    retreiveTodo(name, id){
        return axios.get(`http://localhost:8080//users/${name}/todos/${id}`);
    }

    deleteTodo(username, id){
        return axios.delete(`http://localhost:8080//delete/${username}/todos/${id}`);
    }

}

export default new TodoDataService()