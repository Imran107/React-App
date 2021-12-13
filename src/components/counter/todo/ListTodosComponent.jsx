import React, {Component} from 'react'
import TodoDataService from '../../api/todo/TodoDataService'
import AuthenticationService from './AuthenticationService'

class ListTodosComponent extends Component{

    constructor(props){
        console.log('constructor')
        super(props)
        this.state = {
            todos : [],
            message : null
        }

        this.deleteTodo = this.deleteTodo.bind(this)
        this.refreshGrid = this.refreshGrid.bind(this)
    }

    deleteTodo(id){
        let username = AuthenticationService.getLoggedInUserName();
        TodoDataService.deleteTodo(username, id)
        .then(response => {
            this.setState({message : `Delete of todo ${id} successful`});
            this.refreshGrid();
            } 
        )
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
        this.refreshGrid()
    }

    refreshGrid(){
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
                    {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                    <div className="container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th>Is Completed</th>
                                    <th>Target Date</th>
                                    <th>Delete</th>
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
                                            <td><button className="btn btn-warning" onClick={() => this.deleteTodo(todo.id)}>Delete</button></td>
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