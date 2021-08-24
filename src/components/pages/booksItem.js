import React, { Component } from 'react';
import gotService from '../services/gotService';
import CharDetails,{Field} from '../charDetails';

export default class BooksItem extends Component{
    gotService = new gotService();

    render(){
        return(
        <CharDetails itemId={this.props.bookId}
            getData = {this.gotService.getBook}>
    <Field field = 'numberOfPages' label='NumberOfPages'/>
    <Field field = 'released' label='Released'/>
        </CharDetails>
        )     
    }
}