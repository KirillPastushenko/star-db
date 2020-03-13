import React, {Component} from 'react';
import Header from '../header/header';
import RandomPlanet from '../random-planet/random-planet';
import ItemList from '../item-list/item-list';
import ItemDetails, {Record} from '../item-details/item-details';
import './app.css';
import ErrorIndicator from '../error-indicator/error-indicator';
import {Row} from '../people-page/people-page';
import SwapiService from '../../services/swapi-service';





export default class App extends Component{
    swapiService = new SwapiService;
    state = {
        hasError: false
    };
 
    swapiService = new SwapiService();


    componentDidCatch(){
        this.setState({  
            hasError:true
        })
    }
 
    render(){
        if(this.state.hasError){ 
            return <ErrorIndicator/>
        }

        const {getPerson, 
                getStarship,
                getPersonImage,
                getStarshipImage} = this.swapiService;

        const personDetails =(
            <ItemDetails 
                itemId={11} 
                getData={getPerson} 
                getImageUrl ={getPersonImage}>
                <Record field="gender" label="Gender"/>
                <Record field="eyeColor" label="Eye Color"/>
            </ItemDetails>
        );


        const starshipDetails =(
            <ItemDetails 
                itemId={5} 
                getData={getStarship} 
                getImageUrl ={getStarshipImage}>
                <Record field="model" label="Model"/>
                <Record field="length" label="Length"/>
                <Record field="costInCredits" label="Cost"/>
            </ItemDetails>

        );

        return (
            <div className="stardb-app">
                <Header/>
                <RandomPlanet/> 
                <Row left={personDetails} right={starshipDetails}/>
               

                <div className="row mb2">
                    <div className="col-md-6">
                        <ItemList 
                            onItemSelected={this.onPersonSelected}
                            getData={this.swapiService.getAllPlanets}
                            renderItem={(item) => (<span>{item.name} </span>)}/>
                    </div>
                    <div className="col-md-6">
                        <ItemDetails personId={this.state.selectedPerson}/>
                    </div>
                </div>


                <div className="row mb2">
                    <div className="col-md-6">
                        <ItemList 
                            onItemSelected={this.onPersonSelected}
                            getData={this.swapiService.getAllStarships}
                            renderItem={(item) => item.name}/>
                    </div>
                    <div className="col-md-6">
                        <ItemDetails personId={this.state.selectedPerson}/>
                    </div>
                </div>

       
            </div>
            
        )
    };
};