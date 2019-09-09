import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Logout from '../Logout';
import Login from '../Login';
import Register from '../Register';
import AuthContext from '../../auth-context';
import { withRouter } from 'react-router';

class Header extends Component {

    state={
        authstate:false
    }

    static contextType = AuthContext;
    componentWillMount(){
        console.log('Inside the header component',this.context.authenticated);
        this.setState({
            authstate:this.props.statefield
        })
    }

    loginClicked=()=>{
        this.props.history.push('/login');
    }

    registerClicked=()=>{
        this.props.history.push('/register');
    }

    logoutClicked=()=>{
        this.props.history.push('/logout');
    }


    shouldComponentUpdate(){
        
    }

    buttonClicked=(authval)=>{

        if(authval){
            this.setState({
                authstate:authval
            })
            this.props.history.push('/logout')
        }
        else{
            this.setState({
                authstate:authval
            })
            this.props.history.push('/login')
        }

    }

    registerUser=()=>{
        if(!this.state.authstate){
            this.props.history.push('/register')
        }
        
    }


    render() {
        return(
            <div>
               <button onClick={()=>this.buttonClicked(this.state.authstate)}>
                   {this.state.authstate ? 'Logout':'Login'}
               </button>
              <button onClick={this.registerUser}>Register</button>
            </div>
        )
    }


};

export default withRouter(Header);