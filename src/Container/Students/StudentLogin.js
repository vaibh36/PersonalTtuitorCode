import React, { Component } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';
import { withRouter } from 'react-router';
import Modal from '../../UI/Modal/Modal';
import TextComponent from '../../Components/TextComponent'

class StudentLogin extends Component {

    state = {
        loginForm: {
            Email: {
                value: ''
            },
            Password: {
                value: ''
            }
        },
        tokenstudent: '',
        errorMessage: ''
    }

    componentDidMount() {
        console.log('Inside the component did mount of login')
        this.refs.email.value = ''
        this.refs.password.value = ''
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

    studentLogger = () => {
        console.log('Student trying to login:-', this.state.loginForm);
        const formData = {};
        for (let forElementIdentifier in this.state.loginForm) {
            formData[forElementIdentifier] = this.state.loginForm[forElementIdentifier].value
        }
        axios.post('/api/studentlogin', formData)
            .then((response) => {
                localStorage.setItem('tokenstudent', response.data.token)
                this.props.history.push('/students');
                this.setState({
                    token: response.data.token
                })

            }).catch((err) => {
                console.log('Error is:-', err.response.data.message);
                this.setState({
                    errorMessage: err.response.data.message,

                })
            })

    }

    changeHandler = (event, inputIdentifier) => {
        const updatedForm = {
            ...this.state.loginForm
        }

        const updatedElement = {
            ...this.state.loginForm[inputIdentifier]
        }

        updatedElement.value = event.target.value;
        updatedForm[inputIdentifier] = updatedElement;

        this.setState({
            loginForm: updatedForm
        })

    }


    render() {
        return (
           
                <div>
                    <div class="col-sm-3">
                        <InputGroup style={Object.assign({ margin: 10 }, { width: 300 })}>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-sm">Email:</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl placeholder="Username" aria-label="Username" aria-describedby="inputGroup-sizing-sm"
                                type="email" value={this.props.email} onChange={(event) => this.props.emailVal(event, 'Email')} ref="email" />
                        </InputGroup>
                        <InputGroup style={Object.assign({ margin: 10 }, { width: 300 })}>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-sm">Password:</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl type="password" placeholder="Password" aria-label="Password" aria-describedby="inputGroup-sizing-sm"
                                type="password" value={this.props.password} onChange={(event) => this.props.passwordVal(event, 'Password')} ref="password" />
                        </InputGroup>
                    </div>
                    <Button style={{ margin: 30 }} onClick={this.props.clickStudentLogin} variant="primary">Login</Button>
                  
                    <TextComponent>{this.state.errorMessage}</TextComponent>
                </div>
        
        )
    }
};

export default withRouter(StudentLogin);