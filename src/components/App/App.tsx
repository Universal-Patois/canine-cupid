import React, {Component} from 'react'
import { fetchDogData } from '../../utilities/apiCalls'
import { Props } from '../../utilities/interfaces'
import FeaturedDogs from '../FeaturedDogs/FeaturedDogs'
import Matches from '../Matches/Matches'
// import Favorites from '../Favorites/Favorites'
import { Route , Switch } from 'react-router-dom';
import { NavLink } from 'react-router-dom'
import './App.css'
import logo from '../../assets/canine-cupid_logo.png';

type appState = {
  dogs: []
  filteredDogs: []
  favorites: number[]
  error: string
}

class App extends Component<{}, appState> {
  constructor(props: Props) {
    super(props)
    this.state = {
      dogs: [],
      filteredDogs: [],
      favorites: [],
      error: ''
    }
  }

componentDidMount(): void {
  fetchDogData()
  .then(data => this.setState({dogs: data}))
  .catch(error => this.setState({...this.state, error: error}))
}

  onFavorite = (id: number) => {
    this.setState({...this.state, favorites: [...this.state.favorites, id]})
  }

  //In progress once form is created to get filter keywords
  // filterDogsByTemperament = () => {
  //   this.setState({...this.state, filteredDogs: [...this.state.filteredDogs, name]})
  // }

  render() {
    return (
      <main className='App'>
        <nav>
          <img src = {logo} className= "logo" alt='canine cupid logo'/>
          <h1 className='app-title'>Canine Cupid - A Wag Worthy Match</h1>
          <NavLink to = '/'>Home</NavLink>
          <NavLink to = '/matches'>Matches</NavLink>
          {/* <NavLink to = '/favorites'>Favorites</NavLink> */}
        </nav>
        <Switch>
          <Route exact path='/' render={() => <FeaturedDogs dogs={this.state.dogs}/>}/>
          <Route exact path='/matches' render={() => <Matches filteredDogs={this.state.filteredDogs} onFavorite={this.onFavorite}/>}/>
          {/* <Route exact path='/favorites' render={() => <Favorites favoriteDogs={this.state.favorites} />}/> */}
       </Switch>
      </main>
    )
  }
}

export default App;
