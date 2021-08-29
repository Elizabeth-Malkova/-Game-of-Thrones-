import React, {useState, useEffect} from 'react';
import './randomChar.css';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage'
import GotService from '../services/gotService';

export default function RandomChar() {
    
    const[char,setChar] = useState({});
    const[loading,onCharLoaded] = useState(true);
    const[error,onError] = useState(false);
    
    const gotService = new GotService();
    const updateChar=()=>{
           
        const id=Math.floor(Math.random()*140+25);
        gotService.getCharacter(id)//char -это полученные данные от сервера
        .then((char)=>{
            setChar(char)
            onCharLoaded(false)
            })  //когда заризолвится промис-вызовится функция onCharLoaded(колбек).т.е промис вызывает этот колбек с аргументом,того,что пришло из сервера
        .catch(()=>onError(true))//ловим сров
    }

    useEffect(() => {
        if(Object.keys(char).length === 0){
            updateChar()
        }
        const timerId = setInterval(updateChar, 5000)
        return () => {
            clearInterval(timerId)
        }
    });

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
 
    