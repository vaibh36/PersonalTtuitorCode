import React, { Component } from 'react';
import { Redirect,Route,withRouter } from 'react-router-dom';
import Homepage from './Homepage';
import AuthContext from '../auth-context';
import Header from '../Container/Header/Header';


class Logout extends Component {

    componentWillMount(){
        localStorage.removeItem('token');
        
    }

    render(){
        return(
            <Redirect to='/homepage' />
        )
    }

   
      
}
export default withRouter(Logout);