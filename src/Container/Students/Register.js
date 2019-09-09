import React,{Component} from 'react';
import { Button } from 'react-bootstrap';
import { InputGroup, FormControl } from 'react-bootstrap';
import { Link, Switch, Route, withRouter } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../../Spinner/Spinner';

class Register extends Component {

    componentDidMount(){
        console.log('Inside student register function')
    }

    state={
        registerForm:{
            Firstname:{
                value:''
            },
            Lastname:{
                value:''
            },
            Email:{
                value:''
            },
            Password:{
                value:''
            }
        },
        loading:false,
        message:'',
        loaded:false
    }

    changeHandler=(event,inputIdentifier)=>{
        const updatedForm={
            ...this.state.registerForm
        }

        const updatedElement = {
            ...this.state.registerForm[inputIdentifier]
        }

        updatedElement.value = event.target.value;
        updatedForm[inputIdentifier] = updatedElement;

        this.setState({
            registerForm: updatedForm
        })

    }



    addStudent=(event)=>{
        event.preventDefault();
        this.setState({
            loading:true
        })
        const formData = {};
        for (let forElementIdentifier in this.state.registerForm) {
            formData[forElementIdentifier] = this.state.registerForm[forElementIdentifier].value
        }

        const registerstudent = {
            registerData: formData
        }

        console.log('Form fields entered are:-', registerstudent);

        axios.post('/student/register', registerstudent)
        .then((response) => {
          
            console.log(response.data.message);
            this.setState({
                message:response.data.message,loading:false,loaded:true
            })
         
        }).catch((response) => {
           
            console.log(response.error)
        })

    }
    render(){
        let form;
        let servermessage = this.state.message
        if(!this.state.loaded){
            form=(
                <div class="col-sm-3">
                
                <InputGroup style={{ margin: 10 }}>
                    <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-sm">Firstname:</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl placeholder="Firstname" aria-label="Username" aria-describedby="inputGroup-sizing-sm"
                        type="text"  onChange={(event) => this.changeHandler(event, 'Firstname')} ref="firstname" />
                </InputGroup>
                <InputGroup style={{ margin: 10 }}>
                    <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-sm">Lastname:</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl placeholder="Lastname" aria-label="Username" aria-describedby="inputGroup-sizing-sm"
                        type="text"  onChange={(event) => this.changeHandler(event, 'Lastname')} ref="lastname" />
                </InputGroup>
                <InputGroup style={{ margin: 10 }}>
                    <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-sm">Email:</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl placeholder="Email" aria-label="Username" aria-describedby="inputGroup-sizing-sm"
                        type="email"  onChange={(event) => this.changeHandler(event, 'Email')} ref="email" />
                </InputGroup>
                <InputGroup style={{ margin: 10 }}>
                    <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-sm">Password:</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl type="password" placeholder="Password" aria-label="Password" aria-describedby="inputGroup-sizing-sm"
                        type="password"  onChange={(event) => this.changeHandler(event, 'Password')} ref="password" />
                </InputGroup>
                <Button style={{ margin: 30 }} onClick={this.addStudent} variant="primary">Register</Button>
        </div>
        
            ) }
            if(this.state.loaded){
                form = servermessage
            }
            if(this.state.loading){
                form = <Spinner />
            }
        

        return(
            <div>
                {form}
            </div>
           
        )
    }


};

export default withRouter(Register);
