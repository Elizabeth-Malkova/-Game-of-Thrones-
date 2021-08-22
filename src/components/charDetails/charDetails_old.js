import React, {Component} from 'react';
import './charDetails.css';
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

export default class CharDetails extends Component {

    state = {
        item: null,
        loadind:true,
        error:false
    }
    
    componentDidMount(){
        this.updateItem();
    };
    componentDidUpdate(prevProps){
        if(this.props.itemId !== prevProps.itemId){
            this.updateItem();
        }
    };
    onItemDetailsLoaded = (item) => {
        this.setState({
            item,
            loading: false
        })
    };

    updateItem(){
    const {getData} = this.props;
    const {itemId} = this.props;
    if(!itemId){
        return;
    }
    this.setState({
        loading: true
    })
    getData(itemId)
    .then( this.onItemDetailsLoaded )
    .catch( () => this.onError())
}

onError(){
this.setState({
    item: null,
    error: true
})

        //this.foo.bar=0; 
}
    render() {
       

        if (!this.state.item && this.state.error) {
            return <ErrorMessage/>
        } else if (!this.state.item) {
            return <span className="select-error">Please make your choice</span>
        }
        const {item} = this.state;
        const {name} = item;

        if (this.state.loading) {
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
                       React.Children.map(this.props.children, (child) => {
                        return React.cloneElement(child,{item})
                       })
                   }
                </ul>
            </div>
            </>
        );
    }
}