import React, {useState,useEffect} from 'react';
import './itemDetails.css';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const Field = ({item,field,label})=> {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
            </li>
    )
    
}
export{
    Field
}

export default function ItemDetails ({itemId, getData, children}) {

    const[item,setItem] = useState(null);
    const[loading,onItemDetailsLoaded] = useState(true);
    const[error,onError] = useState(false);

    
    useEffect(()=>{
        console.log(itemId, item)
        
        if(!item || item.id !== itemId){
            updateItem();
        }
    })



    const updateItem=()=>{
        console.log('update', itemId)
        if(!itemId){
            return;
    }
    
    onItemDetailsLoaded(true);

    getData(itemId)
    .then((item)=>{
        setItem(item)
        onItemDetailsLoaded(false)
    })
    .catch( () => onError(true))
}
       if (!item && error) {
            return <ErrorMessage/>
        } else if (!item) {
            return <span className="select-error">Please make your choice</span>
        }
        const {name} = item;
        if (loading) {
            return (
                <div className="char-details rounded">
                    <Spinner/>
                </div>
            )
        }

        return (
            <>
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                   {
                       React.Children.map(children, (child) => {
                        return React.cloneElement(child,{item})
                       })
                   }
                </ul>
            </div>
            </>
        );
    
}
