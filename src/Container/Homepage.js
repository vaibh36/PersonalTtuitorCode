import React, { Component } from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import Register from './Register';
import classes from './Homepage.css';
import Login from './Login';
import Personal from '../Personal/Personal';
import Logout from '../Container/Logout';
import Header from '../Container/Header/Header';
import AuthContext from '../auth-context';
import Findtuitor from '../../src/Container/Findtuitor';
import { withRouter } from 'react-router';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';
import Student from './Student/Student';
import Tuitordata from '../Container/Tuitordata';
import ForgotPassword from '../Container/Forgot'
import NewPassword from './NewPassword';
import RegisterStudent from '../Container/Students/Register';
import StudentLogin from '../Container/Students/StudentLogin';
import TuitorSearch from '../Container/Student/TuitorSearch';
import StudentLogout from '../Container/Students/StudentLogout';
import LoadSpinner from '../Components/LoadSpinner';
import Login1 from './Login1';
import Radium, { StyleRoot } from 'radium';

class Homepage extends Component {

    state = {
        token: '',
        val: false,
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
        loading: false,
        formIsValid: false,
        studentsection: false,
        errorMessage: '',
        tokenstudent: null,
        StudentloginForm: {
            Email: {
                value: ''
            },
            Password: {
                value: ''
            }
        },
        studentLoading: false
    }


    componentWillMount() {

        const token = localStorage.getItem('token');
        const tokenstudent = localStorage.getItem('tokenstudent')

        if (token || tokenstudent) {
            console.log('Token is available')
            this.setState({
                token: token,
                val: true,
                tokenstudent: tokenstudent
            })
        }
        else {
            console.log('Token is unavilable')
            this.setState({
                val: false
            })
        }

    }

    tuitorFinder = () => {

        if (!this.state.val) {
            this.props.history.push('/findtuitor')
        }
    }

    login = (a, b) => {

        this.setState({
            loading: true
        })
        console.log('Inside ogin of homepage:-', a, b);

        const formData = { Email: a, Password: b };
        /* for (let forElementIdentifier in this.state.loginForm) {
             formData[forElementIdentifier] = this.state.loginForm[forElementIdentifier].value
         } */
        axios.post('/api/login', formData)
            .then((response) => {
                localStorage.setItem('token', response.data.token)
                this.props.history.push('/personal');
                this.setState({
                    token: response.data.token, loading: false
                })

            }).catch((err) => {
                console.log('Error is:-', err.response.data.message);
                this.setState({
                    errorMessage: err.response.data.message,
                    loading: false
                }, () => {
                    console.log('Tuitor login state in catch is:-', this.state.errorMessage)
                })
            })

    }

    checkValidity = (value, rules) => {

        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        return isValid;


    }

    changedValue = (event, inputIdentifier) => {

        const updatedLoginForm = {
            ...this.state.loginForm
        };
        const updatedFormElement = {
            ...this.state.loginForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        let isValid = false;
        console.log('Value now:-', updatedFormElement.value.length);
        console.log('Value of element', this.state.loginForm[inputIdentifier], ' is:-', this.state.loginForm[inputIdentifier].validation.minLength)
        if (updatedFormElement.value.length < this.state.loginForm[inputIdentifier].validation.minLength) {
            isValid = false;
            updatedFormElement.valid = false
        } else {
            isValid = true;
            updatedFormElement.valid = true
        }

        let formIsValid = true;
        for (let inputIdentifier in updatedLoginForm) {
            formIsValid = updatedFormElement[inputIdentifier].valid && formIsValid
        }


        updatedLoginForm[inputIdentifier] = updatedFormElement;
        console.log(updatedFormElement)
        this.setState({
            loginForm: updatedLoginForm,
            formIsValid: formIsValid
        })

    }

    studentPage = () => {
        this.setState({
            studentsection: true
        })
    }

    onChangeHandlerStudentHandler = (event, identifier) => {

        const updatedForm = {
            ...this.state.StudentloginForm
        }
        const updatedElement = {
            ...updatedForm[identifier]
        }
        updatedElement.value = event.target.value;

        updatedForm[identifier].value = updatedElement.value;
        this.setState({
            StudentloginForm: updatedForm,
        })
    }

    logout = () => {

        console.log('Insisde the tuitor logout')
        const updatedLoginForm = {
            ...this.state.loginForm
        }


        updatedLoginForm['Password'].value = ''
        updatedLoginForm['Email'].value = ''

        this.setState({
            token: '',
            loginForm: updatedLoginForm
        })

    }

    studentLogOut = () => {

        const updatedStudentForm = {
            ...this.state.StudentloginForm
        }

        updatedStudentForm['Email'].value = '';
        updatedStudentForm['Password'].value = '';

        localStorage.removeItem('tokenstudent');
        this.setState(
            {
                tokenstudent: '',
                StudentloginForm: updatedStudentForm
            }
            , () => {

                this.props.history.push('/')
            })
    }


    loginStudent = () => {

        this.setState({
            studentLoading: true
        })

        const formData = {};
        for (let forElementIdentifier in this.state.StudentloginForm) {
            formData[forElementIdentifier] = this.state.StudentloginForm[forElementIdentifier].value
        }


        axios.post('/api/studentlogin', formData)
            .then((response) => {
                localStorage.setItem('tokenstudent', response.data.token)
                this.props.history.push('/students');
                this.setState({
                    tokenstudent: response.data.token,
                    studentLoading: false,
                }
                )

            }).catch((err) => {
                console.log('Error is:-', err.response.data.message);
                /*           this.setState({
                               errorMessage: err.response.data.message,
                               studentLoading:false
           
                           }) */
                this.setState((state) => ({
                    errorMessage: err.response.data.message,
                    studentLoading: false
                }))

            })

        const updatedStudentForm = {
            ...this.state.StudentloginForm
        }

        updatedStudentForm['Email'].value = ''
        updatedStudentForm['Password'].value = ''

        this.setState({
            StudentloginForm: updatedStudentForm,
            errorMessage: ''
        })


    }



    deleteStudentToken = () => {
        localStorage.removeItem('tokenstudent');

        this.setState({
            tokenstudent: null
        }
        )
        console.log('statement executed');
    }



    render() {

        console.log('Token deleted and the message is:-', this.state)
        let links;
        if (this.state.token) {
            links = (
                <div>
                    <Link to='/logout' onClick={this.logout}>Logout</Link>
                </div>
            )
        }
        else {
            links = (
                <div>
                    <Link style={{ marginLeft: '10px' }} to='/login'>Login</Link>
                    <Link style={{ marginLeft: '10px' }} to='/register'>Register</Link>
                    <div class="dropdown" style={{ marginLeft: 1300 }}>
                        <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Student Corner
    <span class="caret"></span></button>
                        <ul class="dropdown-menu" >
                            <li><Link to='/students/register' >Register</Link></li>
                            <li><Link to='/students/studentlogin'>Login</Link></li>
                        </ul>
                    </div>
                </div>
            )
        }


        let loader;

        if (this.state.loading || this.state.studentLoading) {
            loader = <Spinner />
        }

        return (
            <div>
                <div style={{lineHeight:'20%'}}>
                <Link to='/'><h3  style={{marginLeft:'10px' ,marginBottom:'0px',  paddingBottom: '0px'}}>Find my tuitor</h3></Link>
                <span style={{fontSize:'10px', marginLeft:'80px', fontFamily:'Times New Roman", Times, serif;'}}>Discover.Learn.Grow</span>
                </div>
                <br />
                {links}
                <div>
                </div>
                {loader}
                <Switch>
                    {this.state.tokenstudent ? null : <Route path='/register' exact component={Register}></Route>}
                    {this.state.tokenstudent ? null : <Route path='/login' render={(props) => (<Login1 {...props}
                        message={this.state.errorMessage}
                        clickLogin={this.login}
                    ></Login1>)} />}

                    <Route path='/personal' component={Personal}></Route>
                    <Route path='/findtuitor' component={Findtuitor}></Route>
                    {this.state.tokenstudent ? <Route path='/students' exact component={() => <Student clickme={this.studentLogOut} />}></Route> : null}

                    {this.state.tokenstudent ? null : <Route exact path='/students/register' component={RegisterStudent}></Route>}
                    {this.state.tokenstudent ? null : <Route exact path='/students/studentlogin' render={(props) => (<StudentLogin
                        message={this.state.errorMessage}
                        email={this.state.StudentloginForm.Email.value}
                        password={this.state.StudentloginForm.Password.value}
                        emailVal={this.onChangeHandlerStudentHandler}
                        passwordVal={this.onChangeHandlerStudentHandler}
                        clickStudentLogin={this.loginStudent}
                    ></StudentLogin>)}></Route>}
                    {this.state.tokenstudent ? null : <Route exact path='/tuitorsearch' component={TuitorSearch}></Route>}
                    <Route path='/logout' exact component={() => <Logout />}></Route>
                    <Route path='/students/:id1/:id2/:id3/:id4/:id5/:id6' exact component={Tuitordata}></Route>
                    <Route path='/forgotpassword' component={ForgotPassword}></Route>
                    <Route path='/reset/:id' component={NewPassword}></Route>
                    <Redirect from='/' to='/students'></Redirect>
                </Switch>
            </div>
        )
    }
}

export default Radium(withRouter(Homepage));