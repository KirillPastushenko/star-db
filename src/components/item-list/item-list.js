import React, {Component} from 'react';
import './item-list.css';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner/spinner';


class ItemList extends Component{


    renderItems(arr) {
        return arr.map((item) => {
            const {id} = item;
            const label = this.props.renderItem(item);
            return (
                <li className="list-group-item" 
                    key={id} 
                    onClick={() => this.props.onItemSelected(id)}>
                    {label}
                </li>
            )
        })
    }

    render (){

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        )
    }

} 



const withData = (View) => {
    return class extends Component {
        state = {
            data: []
        };
    
     
    
        componentDidMount(){
            const {getData} = this.props;
    
            getData()
                .then((data) => {
                    this.setState({
                        data
                    });
                })
        }
        render(){
            const {data} = this.state;
            
            if (!data){
                return <Spinner />;
            }
            return <View {...this.props} data={data} />;
        }
    };
}

export default withData(ItemList);