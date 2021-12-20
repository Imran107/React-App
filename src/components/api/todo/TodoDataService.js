import axios from 'axios'

class TodoDataService{

    retreiveAllTodos(name){
        return axios.get(`http://localhost:8085/users/${name}/todos`);
    }

    retreiveTodo(name, id){
        return axios.get(`http://localhost:8085/users/${name}/todos/${id}`);
    }

    deleteTodo(username, id){
        return axios.delete(`http://localhost:8085/delete/${username}/todos/${id}`);
    }

    updateTodo(username, id, todo){
        return axios.put(`http://localhost:8085/users/${username}/todos/${id}`, todo);
    }

    createTodo(username, todo){
        return axios.post(`http://localhost:8085/users/${username}/todos/`, todo);
    }

}

export default new TodoDataService()