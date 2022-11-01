import React, { Component } from 'react'
import { fetchDogData, fetchErrorImage } from '../../utilities/apiCalls'
import { Props } from '../../utilities/interfaces'
import FeaturedDogs from '../FeaturedDogs/FeaturedDogs'
import Matches from '../Matches/Matches'
// import Favorites from '../Favorites/Favorites'
import Error from '../Error/Error'
import { Route , Switch, Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom'
import './App.css'
import logo from '../../assets/canine-cupid_logo.png';

type appState = {
  dogs: []
  filteredDogs: []
  favorites: number[]
  error: string
  errorStatus: number
}

class App extends Component<{}, appState> {
  constructor(props: Props) {
    super(props)
    this.state = {
      dogs: [],
      filteredDogs: [],
      favorites: [],
      error: '',
      errorStatus: 0
    }
  }

componentDidMount(): void {
  fetchDogData()
  .then(data => this.setState({dogs: data}))
  .catch(error => this.getErrorCode(error.message))
}

getErrorCode = (error: string) => {
  const errorString = error.slice(0,3)
    const errorInteger = parseInt(errorString)
    this.setState({...this.state, error: error, errorStatus: errorInteger })
    
  }
  
//   showError = () => {
//     this.state.error && fetchErrorImage(this.state.errorStatus)
// }

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
          {this.state.error && <img src='https://justcors.com/l_j7i8ay4pgok/https://http.dog/404.jpg'></img>}
        <Switch>
          <Route path='/error' render={() => <Error codeNumber={this.state.errorStatus} />}/>
          <Route exact path='/'>
            {this.state.error ? <Redirect to='/error' /> : <FeaturedDogs dogs={this.state.dogs} /> }
          </Route>
          <Route exact path='/matches' render={() => <Matches filteredDogs={this.state.filteredDogs} onFavorite={this.onFavorite}/>}/>
          <Route render={() => <Redirect to={{pathname: '/'}} /> } />
          {/* <Route exact path='/favorites' render={() => <Favorites favoriteDogs={this.state.favorites} />}/> */}
       </Switch>
      </main>
    )
  }
}

export default App;
