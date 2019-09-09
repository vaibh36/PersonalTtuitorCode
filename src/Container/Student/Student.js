import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import { Link, Route } from 'react-router-dom';
import Tuitordata from '../../Container/Tuitordata';
import { withRouter } from 'react-router';
import Tuitors from '../Student/Tuitors';
import RegisterStudent from '../../Container/Students/Register';




class Student extends Component {

    state = {
        result: [],
        searchForm: {
            State: {
                value: ''
            },
            City: {
                value: ''
            },
            Place: {
                value: ''
            },
            Subject: {
                value: ''
            }
        },
        serverMessage: '',
        val: 0,
        tokenstudent:null

    }
    componentDidMount() {
        this.setState({
            tokenstudent: localStorage.getItem('tokenstudent')
        })
    }

    inputChangeHandler = (event, identifier) => {

        const updatedForm = {
            ...this.state.searchForm
        }
        const updatedElement = {
            ...updatedForm[identifier]
        };
        updatedElement.value = event.target.value;
        updatedForm[identifier].value = updatedElement.value;

        this.setState({
            searchForm: updatedForm
        })

    }

    selectTuitor = (id) => {
        console.log('Inside selecttuitor:-', this.state.result);

        this.props.history.push('/tuitordata')

    }

    searchTuitor = (event) => {
        event.preventDefault();
        this.setState({
            serverMessage: '',
            result: []
        })
        const formData = {};
        for (let forElementIdentifier in this.state.searchForm) {
            formData[forElementIdentifier] = this.state.searchForm[forElementIdentifier].value;
        }

        const searchFields = {
            searchForm: formData
        }

        console.log('Search criteria is:-', searchFields);
        axios.get('/api/searchtuitor/' + this.state.searchForm.State.value + '/' + this.state.searchForm.City.value + '/' + this.state.searchForm.Place.value + '/' + this.state.searchForm.Subject.value)
            .then(res => {
                this.setState({
                    result: res.data.docs,
                })
            }).catch((err) => {
                console.log('Error is:-', err.response.data.message);
                this.setState({
                    serverMessage: err.response.data.message
                })
            })
    }

    clicktoFavouriteorUnfavourite = (email) => {
        console.log('Email of the tuitor that is to be favourited is:-', email);
        const token = localStorage.getItem('tokenstudent')
        const config = {
            headers: {
                Authorization: "Bearer " + token
            },
        }
        const data = {
            tuitoremail: email
        }
        axios.post('/favouriteme', data, config)
            .then((response) => {
                console.log('Response on clicking the Favourite or unfavourited  buttons is:-', response);
                
                axios.get('/api/searchtuitor/' + this.state.searchForm.State.value + '/' + this.state.searchForm.City.value + '/' + this.state.searchForm.Place.value + '/' + this.state.searchForm.Subject.value)
                .then(res => {
    
                    this.setState({
                        result: res.data.docs,
    
                    })
                }).catch((err) => {
                    console.log('Error is:-', err.response.data.message);
                    this.setState({
                        serverMessage: err.response.data.message
                    })
                })

            }).catch((err) => {
                console.log('Error is:-', err.response.data.message);
            })
    }


    render() {
        let tuitors;
        tuitors = this.state.result.map((doc, index) => {
            return (

                <Tuitors key={index}
                    clickMe={() => this.clicktoFavouriteorUnfavourite(doc.Email)}
                    firstname={doc.FirstName}
                    lastname={doc.LastName}
                    favouriteCount={doc.FavouriteCount}
                ></Tuitors>
            )
        })

        return (
            <div>
               

               <Link to='/' onClick={this.props.clickme}>Logout</Link>

                {this.props.children}
                <div class="col-sm-3">
                    <h2></h2>
                    <InputGroup style={{ margin: 10 }}>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-sm">State:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl placeholder="State" aria-label="State" aria-describedby="inputGroup-sizing-sm"
                            type="text" value={this.props.email} onChange={(event) => this.inputChangeHandler(event, 'State')} />
                    </InputGroup>
                    <InputGroup style={{ margin: 10 }}>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-sm">City:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl placeholder="City" aria-label="City" aria-describedby="inputGroup-sizing-sm"
                            type="text" value={this.props.email} onChange={(event) => this.inputChangeHandler(event, 'City')} />
                    </InputGroup>
                    <InputGroup style={{ margin: 10 }}>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-sm">Subject:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl placeholder="Subject" aria-label="City" aria-describedby="inputGroup-sizing-sm"
                            type="text" value={this.props.subject} onChange={(event) => this.inputChangeHandler(event, 'Subject')} />
                    </InputGroup>
                    <InputGroup style={{ margin: 10 }}>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-sm">Place:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl placeholder="Place" aria-label="City" aria-describedby="inputGroup-sizing-sm"
                            type="text" value={this.props.email} onChange={(event) => this.inputChangeHandler(event, 'Place')} />
                    </InputGroup>
                    <Button style={{ margin: 30 }} onClick={this.searchTuitor} variant="primary">Search</Button>
                </div>
                {tuitors}
                {this.state.serverMessage}

            </div>
        )

    }
}
export default withRouter(Student);