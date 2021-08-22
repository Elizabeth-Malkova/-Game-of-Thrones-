import React, { Component } from 'react';
import ItemList from '../itemList';
import CharDetails,{Field} from '../charDetails';
import RowBlock from '../rowBlock';
import ErrorMessage from '../errorMessage';
import gotService from '../services/gotService';


export default class CharacterPage extends Component{

    gotService = new gotService();

    state = {
        selectedChar:130,
        error:false
    }
    onItemSelected = (id) => {
        this.setState ({
        selectedChar: id
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
    onItemSelected={this.onItemSelected} 
    getData = {this.gotService.getAllCharacters}
    renderItem = {({name,gender}) => `${name}(${gender})`}/>
)

const itemDetails = (
    <CharDetails itemId={this.state.selectedChar}
        getData = {this.gotService.getCharacter}>
<Field field = 'gender' label='Gender'/>
<Field field = 'born' label='Born'/>
<Field field = 'died' label='Died'/>
<Field field = 'culture' label='Culture'/>
    </CharDetails>
)

        return(
           <RowBlock left={itemList} right={itemDetails}/> //теперь итем лист и чар детеилс стали пропсами и функцию роу блок-можно импортировать
        )}
}