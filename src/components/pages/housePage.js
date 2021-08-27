import React, { Component } from 'react';
import ItemList from '../itemList';
import ItemDetails,{Field} from '../itemDetails';
import RowBlock from '../rowBlock';
import ErrorMessage from '../errorMessage';
import gotService from '../services/gotService';

export default class HousesPage extends Component{

    gotService = new gotService();

    state = {
        //selectedHouse:44,
        error:false
    }
    onHouseSelected = (id) => {
        this.setState ({
            selectedHouse: id
            })
        console.log(this.state)
    };
    componentDidCatch() {
        this.setState({
            error:true
        })
    };

    render(){
        if(this.state.error){
            return <ErrorMessage/>
        }
const itemList = (
    <ItemList
    onItemSelected={this.onHouseSelected} 
    getData = {this.gotService.getAllHouses}
    renderItem = {({name,region}) => `${name}(${region})`}/>
)

const itemDetails = (
    <ItemDetails itemId={this.state.selectedHouse}
        getData = {this.gotService.getHouse}>
<Field field = 'region' label='Region'/>
<Field field = 'words' label='Words'/>
<Field field = 'titles' label='Titles'/>
<Field field = 'overlord' label='Overlord'/>
<Field field = 'ancestralWeapons' label='AncestralWeapons'/>
    </ItemDetails>
)

        return(
           <RowBlock left={itemList} right={itemDetails}/> //теперь итем лист и чар детеилс стали пропсами и функцию роу блок-можно импортировать
        )}
}