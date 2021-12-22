import axios from 'axios'
import { API_URL } from '../../../Constants'

class TodoDataService{

    retreiveAllTodos(name){
        return axios.get(`${API_URL}/users/${name}/todos`);
    }

    retreiveTodo(name, id){
        return axios.get(`${API_URL}/users/${name}/todos/${id}`);
    }

    deleteTodo(username, id){
        return axios.delete(`${API_URL}/delete/${username}/todos/${id}`);
    }

    updateTodo(username, id, todo){
        return axios.put(`${API_URL}/users/${username}/todos/${id}`, todo);
    }

    createTodo(username, todo){
        return axios.post(`${API_URL}/users/${username}/todos/`, todo);
    }

}

export default new TodoDataService()