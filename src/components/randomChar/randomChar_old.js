import React, {Component} from 'react';
import './randomChar.css';
import gotService from '../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage'
import PropTypes from 'prop-types';

export default class RandomChar extends Component {


    gotService=new gotService();

    state={
   char: {},
   loading: true,
   error:false
    }
    static defaultProps={
        interval:15000
    }

componentDidMount(){
    this.updateChar()
    this.timerId = setInterval(this.updateChar,this.props.interval)
}//6

componentWillUnmount(){
    clearInterval(this.timerId)
}

onCharLoaded=(char)=>{
    this.setState({
        char: char,
    loading:false,
   
})//8 это функция колбек
}
onError=(err)=>{
this.setState({
    error:true,
    loading:false
})//9
}

    updateChar=()=>{
       
        const id=Math.floor(Math.random()*140+25);
       
            this.gotService.getCharacter(id)//char -это полученные данные от сервера
                .then(this.onCharLoaded)//когда заризолвится промис-вызовится функция onCharLoaded(колбек).т.е промис вызывает этот колбек с аргументом,того,что пришло из сервера
                .catch(this.onError)//ловим сров
    }//7


    render() {
        console.log('render')
        const {char,loading,error}=this.state
        const errorMessage = error ? <ErrorMessage/> : null
        const spinner= loading ? <Spinner/> : null
        const content= !(loading || error) ? <View char={char}/> : null
        
        

        return (
            <div className="random-block rounded">
                {content}
                {spinner}
                {errorMessage}
            </div>
        );
    }
}
RandomChar.defaultProps = {
    interval: 15000
}

RandomChar.propTypes={
    interval: PropTypes.number
}

 const View=({char})=>{
     const{name,gender,born,died,culture}=char;
     return(
     <>
     <h4>Random Character:{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Gender </span>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Born </span>
                        <span>{born}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Died </span>
                        <span>{died}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Culture </span>
                        <span>{culture}</span>
                    </li>
                </ul>
              
     </>
     )
 }