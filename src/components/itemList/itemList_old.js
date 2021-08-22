import React, {Component} from 'react';
import './itemList.css';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import gotService from '../services/gotService';

class ItemList extends Component {

   
    /*static defaultProps = {
        onItemSelected: () =>{}
    }
    
    static protoTypes = {
        onItemSelected: PropTypes.func
    }*/

  

renderItems(arr){
return arr.map((item)=>{
    const {id} = item;
    const label = this.props.renderItem(item);
    return(
                <li 
                key={id}
                className="list-group-item"
                onClick={ () => this.props.onItemSelected(id)}>
                {label}
                </li>
    )
})
 }

    render(){
        const {data}=this.props
        const items = this.renderItems(data);
        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}
//View -это какой-то аргумент,который будет приходить в виде компонента


 const withData=(View,getData)=>{
return class extends Component{

    state={
        data:null,
        error:false
    };
    componentDidMount(){
//функция гетдата приходит из аргумента функции , а входит туда из верхнего уровня

getData()
.then((data)=>{
    this.setState({
            data,
            error:false
        });
})
.catch((err)=>{
    console.log(err)
    this.setState({
        data:null,
        error:true})
    });
    }

render(){
    const{data,error} = this.state;

    if(error){
       return <ErrorMessage/>
    }
    if(!data){
    return <Spinner/>
    }
    return <View {...this.props} data={data}/>
}
}
}

const {getAllCharacters} = new gotService();
export default withData(ItemList,getAllCharacters); //этот компонент итемЛист подста