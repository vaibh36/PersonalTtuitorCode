import React, { Component } from 'react';
import Input from '../input';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';
import Personal from '../Personal/Personal';
import { Link, Switch, Route, withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { InputGroup, FormControl } from 'react-bootstrap';
import Header from '../Container/Header/Header';
import TextComponent from '../Components/TextComponent';
import Radium from 'radium'

class Login1 extends Component{

    state={
        loginForm: {
            Email: {
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                },
                valid: false
            },
            Password: {
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                },
                valid: false
            }
        },
        errorMessage:''
    }

    componentDidMount(prevProps){
        console.log('Component did mount of Login1 is called:-', this.props);
      
    }

    componentDidUpdate(prevProps,prevState){
        console.log('Component did update of Login1 is called');
        console.log('prevProps message is:-', prevProps.message);
        console.log('This.props message is:-', this.props.message);
        console.log('This.state.errormessage is:-', this.state.errorMessage)
        if(prevProps.message !== this.props.message){
            this.setState({
                errorMessage: this.props.message
            })
        }
        else{
            console.log('we are in else')
        }
    }

    onChangeHandler = (event, identifier) => {
        const updatedForm = {
            ...this.state.loginForm
        }
        const updatedElement = {
            ...updatedForm[identifier]
        }
        updatedElement.value = event.target.value;
        updatedForm[identifier].value = updatedElement.value;
        this.setState({
            loginForm: updatedForm,

        })
    }

    render(){
        console.log('Inside render of login1');
        
        return(
            <div>
                 <div class="col-sm-3">
                    <InputGroup style={{ margin: 10 }}>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-sm">Email:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl placeholder="Username" aria-label="Username" aria-describedby="inputGroup-sizing-sm"
                            type="email" value={this.props.email} onChange={(event) => this.onChangeHandler(event, 'Email')} ref="email" />
                    </InputGroup>
                    <InputGroup style={{ margin: 10 }}>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-sm">Password:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl type="password" placeholder="Password" aria-label="Password" aria-describedby="inputGroup-sizing-sm"
                            type="password" value={this.props.password} onChange={(event) => this.onChangeHandler(event, 'Password')} ref="password" />
                    </InputGroup>
                </div>
                <Link to='/forgotpassword' style={{margin:'20px'}}><small>Forgot Password</small></Link>
                <Button style={{ margin: 30 }} onClick={()=>this.props.clickLogin(this.state.loginForm.Email.value,this.state.loginForm.Password.value)} variant="primary">Login</Button>
                <TextComponent>{this.state.errorMessage}</TextComponent>
            </div>
        )
    }
};

export default withRouter(Login1);