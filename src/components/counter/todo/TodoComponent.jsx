import React, {Component} from 'react'
import moment from 'moment';
import { Formik, Form, Field } from 'formik';

class TodoComponent extends Component{

    constructor(props){
        super(props)
        this.state = {
            id:this.props.match.params.id,
            description:"Learning Forms",
            targetDate : moment(new Date()).format('YYYY-MM-DD')
        }
    }

    render(){
        let description= this.state.description
        let targetDate = this.state.targetDate
        return(
            <div>
                <h1>Todo</h1>
                <div classname="container">
                    <Formik initialValues={{description:description, targetDate:targetDate}}
                    >
                        {
                            (props) => (
                                <Form>
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