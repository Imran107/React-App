import React, {Component} from 'react'
import moment from 'moment';
import { Formik, Form, Field, ErrorMessage } from 'formik';

class TodoComponent extends Component{

    constructor(props){
        super(props)
        this.state = {
            id:this.props.match.params.id,
            description:"Learning Forms",
            targetDate : moment(new Date()).format('YYYY-MM-DD')
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
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