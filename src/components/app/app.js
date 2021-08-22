import React, { Component } from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import gotService from '../services/gotService';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import {CharacterPage,BooksPage,HousesPage,BooksItem} from '../pages'


export default class App extends Component {

    gotService = new gotService();

    constructor(props){
    super(props);        
       this.onToggle = this.onToggle.bind(this)
    }
    state = {
        toggle:true,
        showRandomChar: true,
        error: false,
        selectedHouse: null,
        selectedBook: null,
    }
        componentDidCatch() {
            console.log('error');
            this.setState({
                error:true
            })
        }
        onToggle=()=>{
            this.setState (({toggle}) => ({
                toggle: !toggle
            }))
        };
        onCharacterSelected = (id) => {
            this.setState ({
            selectedChar: id
            });
        };
        onHouseSelected = (id) => {
            this.setState ({
            selectedHouse: id
            });
        };
        onBookSelected = (id) => {
            this.setState ({
            selectedBook: id
            });
        };
        
    
        render() {
            const{toggle} = this.state
            const toggles = toggle ? <RandomChar/> : null;

            if(this.state.error){
                return <ErrorMessage/>
            }
            
    return (
        <Router>
            <div className = "app"/>
            <>
            <Container>
                <Header />
            </Container>
            <Container>
                <Row>
                    <Col lg={{size: 5, offset: 0}}>
                        {toggles}
                <button className="toogle-btn"
                    onClick={this.onToggle}> Toggle random character 
                </button>
                    </Col>
                </Row>
                <Route path ='/characters' component={CharacterPage}/>
                <Route path ='/houses' component={HousesPage}/>
                <Route path ='/books'  exact component={BooksPage}/>
                <Route path ='/books/:id' render={
                    ({match})=>{
                        const {id} = match.params;
                    return <BooksItem bookId={id}/>
                    }
                }/>
            </Container>
        </>
        </Router>
    )
};
        }
