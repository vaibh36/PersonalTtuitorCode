import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Input from '../input';
import AuthContext from '../auth-context';
import Header from '../Container/Header/Header';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

class personal extends Component {

    state = {
        Places: [],
        Subject: '',
        logged: false,
        newPlaces: '',
        formIsValid: false,
        FavouriteCount: null
    }

    constructor(props) {
        super(props);

    }

    componentDidMount() {

        const token = localStorage.getItem('token')
        const config = {
            headers: {
                Authorization: "Bearer " + token
            },
        }
        axios.get('/api/fetchtuitor', config)
            .then(res => {

                console.log('response with all the data is:-', res)
                this.setState({
                    Places: res.data.Places,
                    Subject: res.data.Subject,
                    logged: true,
                    FavouriteCount: res.data.FCount
                })
            }).catch((err) => {
                console.log('error inside')
                console.log(err);
                this.setState({
                    logged: false
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

    inputChangeHandler = (event) => {

        let updatedPlaces = this.state.newPlaces;
        updatedPlaces = event.target.value;
        let formIsValid;

        if (updatedPlaces.length > 2) {
            formIsValid = true;
        }

        this.setState({
            newPlaces: updatedPlaces,
            formIsValid: formIsValid
        })
    }

    addPlacesHandler = (event) => {

        event.preventDefault();

        let Placesdata = this.state.newPlaces;
        const Placcesarray = Placesdata.split(" ");


        const token = localStorage.getItem('token');

        const config = {
            headers: {
                Authorization: "Bearer " + token
            }
        }

        const data = {
            places: Placcesarray
        }



        axios.post('/api/places/addplaces', data, {
            'headers': {
                'Authorization': 'Bearer ' + token
            }
        }).then((res) => {

            this.setState({
                Places: res.data.Places,
                value: '',
                formIsValid: false
            })
            this.refs.newplaces.value = ''
        }).catch((err) => {
            console.log(err)
        })

    }



    deleteLocation = (location) => {

        const token = localStorage.getItem('token');

        const config = {
            headers: {
                Authorization: "Bearer " + token
            },
        }

        const data = {
            place: location
        }

        axios.post('/api/delete', data, {
            'headers': {
                'Authorization': 'Bearer ' + token
            }
        }).then((res) => {

            this.setState({
                Places: res.data.Places
            })
        })
    }


    render() {

        const formPlacesArray = [];

        let allPlaces = this.state.Places;

        /*     if(!allPlaces){
                 let Placesarray = allPlaces.split(" ");
                 console.log(Placesarray)
             } */


        let form = (
            <form width="900" onSubmit={this.addPlacesHandler}>
                {/*  <input type="input" onChange={(event) => this.inputChangeHandler(event)}></input> */}
                <div class="col-sm-3">
                    <InputGroup style={{ margin: 5 }}>
                        <FormControl
                            placeholder="Add Places"
                            aria-label="Add Places" ref="newplaces"
                            aria-describedby="basic-addon2"
                            onChange={(event) => this.inputChangeHandler(event)}
                        />
                    </InputGroup>
                    <span>Add single value without special characters eg. sec7,sec8,sec9</span>
                </div>
                <Button type="submit" style={{ margin: 30 }} disabled={!this.state.formIsValid}>AddPlaces</Button>
            </form>
        )


        let personalData;
        if (this.state.logged) {
            personalData = (
                <div>
                    <p>Myclasses and the places are mentioned below</p>
                    <ul>

                        {allPlaces.map((place, index) => {
                            return (
                                <ul key={index}>
                                    <li>{place}  <button onClick={() => this.deleteLocation(place)}>Deleteme</button></li>

                                </ul>
                            )

                        })}
                    </ul>

                    <p>Subject:{this.state.Subject}</p>
                    <div style={Object.assign({ marginLeft: 450 })}>
                        <i class="material-icons">favorite</i>{this.state.FavouriteCount}
                    </div>
                    {form}
                </div>
            )
        }
        else {
            personalData = null
        }

        return (
            <div>
                {personalData}
            </div>

        )
    }

}

export default personal;