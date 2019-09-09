import React,{Component} from 'react';
import { Link, Switch, Route } from 'react-router-dom';

class TuitorSearch extends Component {

    render(){
        return(
            <div>
                 <Link style={{margin:10}} to='/students/register'>StudentRegister</Link>
                <Link to='/students/studentlogin'>StudentLogin</Link>
            </div>
        )
    }

};

export default TuitorSearch;