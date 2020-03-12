import React, {Component} from 'react';
import Header from '../header/header';
import RandomPlanet from '../random-planet/random-planet';
import ItemList from '../item-list/item-list';
import PersonDetails from '../person-details/person-details';

import './app.css';
import ErrorIndicator from '../error-indicator/error-indicator';

export default class App extends Component{
    state = {
        selectedPerson: 5,
        hasError: false
    };

    onPersonSelected = (id) => {
        this.setState({
            selectedPerson:id
        })
    };


    componentDidCatch(){
        console.log('componentDidCatch');
        this.setState({
            hasError:true
        })
    }

    render(){
        if(this.state.hasError){ 
            return <ErrorIndicator/>
        }
        return (
            <div className="stardb-app">
                <Header/>
                <RandomPlanet/> 
                <div className="row mb2">
                    <div className="col-md-6">
                        <ItemList onItemSelected={this.onPersonSelected}/>
                    </div>
                    <div className="col-md-6">
                        <PersonDetails personId={this.state.selectedPerson}/>
                    </div>
                </div>
            </div>
        )
    };
};