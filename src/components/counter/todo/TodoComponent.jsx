import React, {Component} from 'react'
import moment from 'moment';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import TodoDataService from '../../api/todo/TodoDataService';
import AuthenticationService from './AuthenticationService';

class TodoComponent extends Component{

    constructor(props){
        super(props)
        this.state = {
            id:this.props.match.params.id,
            description:'',
            targetDate : moment(new Date()).format('YYYY-MM-DD')
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    componentDidMount(){
        if(this.state.id === -1){
            return
        }
        let username = AuthenticationService.getLoggedInUserName()
        TodoDataService.retreiveTodo(username, this.state.id)
        .then(response => this.setState(
                        {
                            description:response.data.description, 
                            targetDate:moment(response.data.targetDate).format('YYYY-MM-DD')
                        }))
    }

    validate(values){
        let errors = {}
        if(!values.description){
            errors.description = "Description field can't be empty"
        }else if(values.description.length < 5){
            errors.description = "There must be at least 5 characters for description"
        }

        if(!moment(values.targetDate).isValid()){
            errors.targetDate = "Date is Invalid!"
        }
        return errors
    }

    
    onSubmit(values){
        let username = AuthenticationService.getLoggedInUserName()
        let todo = {
            id : this.state.id,
            description : values.description,
            targetDate : values.targetDate
        }

        if(this.state.id == -1){
            TodoDataService.createTodo(username, todo).then(() => this.props.history.push('/todos'))
        }else{
             TodoDataService.updateTodo(username, this.state.id, todo).then(() => this.props.history.push('/todos'))
        }
        
        console.log(values);
    }

    render(){
        let {description, targetDate} = this.state
        return(
            <div>
                <h1>Todo</h1>
                <div className="container">
                    <Formik initialValues={{description, targetDate}} 
                            onSubmit={this.onSubmit} 
                            validate={this.validate}
                            validateOnBlur={false}
                            validateOnChange={false}
                            enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                                    <ErrorMessage name="targetDate" component="div" className="alert alert-warning"/>
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field type="text" className="form-control" name="description"></Field>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Target date</label>
                                        <Field type="date" className="form-control" name="targetDate"></Field>
                                    </fieldset>
                                    <button type="submit" className="btn btn-success">Save</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        );
    }
}

export default TodoComponent