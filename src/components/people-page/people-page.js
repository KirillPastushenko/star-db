import React, {Component} from 'react';
import './people-page.css';
import ItemList from '../item-list/item-list';
import ItemDetails from '../item-details/item-details';
import ErrorIndicator from '../error-indicator/error-indicator';
import ErrorButton from '../error-button/error-button';
import SwapiService from '../../services/swapi-service';
 
const Row = ({left, right}) => {
    return (
        <div className="row mb2">
            <div className="col-md-6">
                {left}
            </div>
            <div className="col-md-6">
                {right}
            </div>
        </div>
    )
}

export {
    Row
};



export default class PeoplePage extends Component {
    swapiService = new SwapiService();
    state = {
        selectedPerson: 5,
        hasError: false
    }

    componentDidCatch(){
        this.setState({
            hasError:true
        })
    }

    onPersonSelected = (selectedPerson) => {
        this.setState({selectedPerson})
    };

    render(){
        if(this.state.hasError){
            return <ErrorIndicator/>
        }
        const itemList = (                    
            <ItemList 
                onItemSelected={this.onPersonSelected}
                getData={this.swapiService.getAllPeople}
                renderItem={({name, gender, birthYear}) => `${name} (${gender}, ${birthYear})`}/>
        );
        const personDetails = (
            <ItemDetails personId={this.state.selectedPerson}/>
        )

        return (
            <Row left={itemList} right={personDetails}/>
        )
    }
} 