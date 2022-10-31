import React, { Component } from "react";
import { fetchDogData } from "../../utilities/apiCalls";
import { Props, dogData } from "../../utilities/interfaces";
import FeaturedDogs from "../FeaturedDogs/FeaturedDogs";
import MoodForm from "../MoodForm/MoodForm";
import Matches from "../Matches/Matches";
// import Favorites from '../Favorites/Favorites'
import { Route, Switch } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./App.css";
import logo from "../../assets/canine-cupid_logo.png";
import Dog from "../Dog/Dog";

type appState = {
  dogs: [];
  filteredDogs: dogData[];
  favorites: number[];
  error: string;
};

class App extends Component<{}, appState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      dogs: [],
      filteredDogs: [],
      favorites: [],
      error: "",
    };
  }

  componentDidMount(): void {
    fetchDogData()
      .then((data) => this.setState({ dogs: data }))
      .catch((error) => this.setState({ ...this.state, error: error }));
  }

  onFavorite = (id: number) => {
    this.setState({ ...this.state, favorites: [...this.state.favorites, id] });
  };

  filterDogsByTemperament = (checkedMoods: string[]) => {
    let filterDogs: dogData[] = [];
    this.state.dogs.forEach((dog: dogData) => {
      checkedMoods.forEach((mood: string) => {
        if (dog.temperament !== undefined && dog.temperament.includes(mood)) {
          filterDogs.push(dog);
        }
      });
      return filterDogs;
    });

    this.setState({ ...this.state, filteredDogs: filterDogs });
  };

  render() {
    console.log(this.state.filteredDogs);
    return (
      <main className="App">
        <nav>
          <div className="logo-title">
            <img src={logo} className="logo" alt="canine cupid logo" />
            <h1 className="app-title">Canine Cupid - A Wag Worthy Match</h1>
          </div>
          <div className="links">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/matches">Matches</NavLink>
          </div>
          {/* <NavLink to = '/favorites'>Favorites</NavLink> */}
        </nav>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <div className="home-page">
                <MoodForm
                  dogs={this.state.dogs}
                  filterDogsByTemperament={this.filterDogsByTemperament}
                />
                <FeaturedDogs dogs={this.state.dogs} />
              </div>
            )}
          />
          <Route
            exact
            path="/matches"
            render={() => (
              <Matches
                filteredDogs={this.state.filteredDogs}
                onFavorite={this.onFavorite}
              />
            )}
          />
          {/* <Route exact path='/favorites' render={() => <Favorites favoriteDogs={this.state.favorites} />}/> */}
        </Switch>
      </main>
    );
  }
}

export default App;
