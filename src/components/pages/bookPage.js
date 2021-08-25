import React, { Component } from 'react';
import ItemList from '../itemList';
import ErrorMessage from '../errorMessage';
import gotService from '../services/gotService';
import {withRouter} from 'react-router-dom'


 class BooksPage extends Component{

    gotService = new gotService();

    state = {
        error:false
    }
    onBookSelected = (id) => {
        this.setState ({
        selectedBook: id
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

        return(
            <ItemList
            onItemSelected={(itemId) => {
            this.props.history.push(itemId)//попадем на ту страницу,на которую мы и кликнули
            }

            } 
            getData = {this.gotService.getAllBooks}
            renderItem = {({name,publisher}) => { console.log(name, publisher); return `${name}(${publisher})`}}/>
        )}
}
export default withRouter(BooksPage);