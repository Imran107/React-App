import React, {Component} from 'react'
import TodoDataService from '../../api/todo/TodoDataService'
import AuthenticationService from './AuthenticationService'

class ListTodosComponent extends Component{

    constructor(props){
        console.log('constructor')
        super(props)
        this.state = {
            todos : [
                    //{id:1, description: "Learn React", done:false, targetDate: new Date()},
                    //{id:2, description: "Learn MVC", done:false, targetDate: new Date()},
                    //{id:3, description: "Learn Spring Boot", done:false, targetDate: new Date()}
                   ]
        }
    }

    componentWillUnmount(){
        console.log('componentWillUnmount')
    }

    shouldComponentUpdate(nextProps, nextState){
        console.log('nextProps')
        console.log('nextState')
        console.log('shouldComponentUpdate')
        return true;
    }

    componentDidMount(){
        console.log('componentDidMount')
        let username = AuthenticationService.getLoggedInUserName();
        TodoDataService.retreiveAllTodos(username)
        .then(
            response => this.setState({todos:response.data})
        )
    }

    render(){
        console.log('render')
        return (
                <div> 
                    <h1>List Todos</h1>
                    <div className="container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th>Is Completed</th>
                                    <th>Target Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.todos.map(
                                        todo =>
                                        <tr key={todo.id}>
                                            <td>{todo.description}</td>
                                            <td>{todo.done.toString()}</td>
                                            <td>{todo.targetDate.toString()}</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            )
    }
}

export default ListTodosComponent