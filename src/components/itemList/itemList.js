import React, {useState,useEffect} from 'react';
import './itemList.css';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';


function ItemList({getData,onItemSelected,renderItem}) {

    const[itemList, updateList]=useState([])
    const[error,onError] = useState(false);

    useEffect(()=>{
        getData()
        .then((data)=>{
            updateList(data)// при помощи этой функции мы будем изменять наш стейт,который лежит в itemList 
        })
        .catch( () => onError(true))
           },[])//второй агрумент юзеффекта(итемлист) гласит,что если наш итемлист не изменился,то мы ничего делать не будем,но этот способ сработает,если в этом состоянии примитив(число,строка или булен)
//а если вторым аргументом предать пустой масив, это скажет хуку,что еффект нужно выполнить только при появлении компонента и его изчезновении
    function renderItems (arr) {
        return arr.map((item)=>{
            const {id} = item;
            const label = renderItem(item);
            return(
                <li 
                key={id}
                className="list-group-item"
                onClick={ () => onItemSelected(id)}>
                {label}
                </li>
            )
        })
    }

    if(error){
        return <ErrorMessage/>
    }
    if(!itemList){
    return <Spinner/>
    }

    const items = renderItems(itemList);
    return (
        <ul className="item-list list-group">
            {items}
        </ul>
    );}

export default ItemList; //этот компонент итемЛист подставится вместо View при вызове функции