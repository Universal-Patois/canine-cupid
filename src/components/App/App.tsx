import React, { Component } from "react";
import { fetchDogData, fetchErrorImage } from "../../utilities/apiCalls";
import { Props, dogData, personalityState } from "../../utilities/interfaces";
import FeaturedDogs from "../FeaturedDogs/FeaturedDogs";
import Matches from "../Matches/Matches";
import Favorites from "../Favorites/Favorites";
import MoodForm from "../MoodForm/MoodForm";
import Error from "../Error/Error";
import { Route, Switch, Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./App.css";
import logo from "../../assets/paw.png";
import DogInfo from "../DogInfo/DogInfo";
import unfavorited from "../../assets/unfavorite.png";
import favorited from "../../assets/favorited.png";

type appState = {
  dogs: [];
  filteredDogs: dogData[];
  favorites: number[];
  error: string;
  errorStatus: number;
  errorImageURL: string;
};

class App extends Component<{}, appState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      dogs: [],
      filteredDogs: [],
      favorites: [],
      error: "",
      errorStatus: 0,
      errorImageURL: "",
    };
  }

  componentDidMount(): void {
    fetchDogData()
      .then((data) => this.setState({ dogs: data }))
      .catch((error) => this.getErrorCode(error.message));
  }

  getErrorCode = (error: string) => {
    const errorString = error.slice(0, 3);
    const errorInteger = parseInt(errorString);
    this.setState({ ...this.state, error: error, errorStatus: errorInteger });
    fetchErrorImage(errorInteger).then((data: string) => {
      this.setState({ ...this.state, errorImageURL: data })
  });
  };

  onToggleFavorite = (id: number, event: any) => {
    if (event.target.src === unfavorited) {
      event.target.src = favorited;
      this.setState({...this.state, favorites: [...this.state.favorites, id]});
    } else {
      event.target.src = unfavorited;
      const filteredFavorites: number[] = this.state.favorites.filter(
        (favoriteId: number) => favoriteId !== id
      );
      this.setState({...this.state, favorites: filteredFavorites});
    }
  };

  favoriteDogs = () => {
    return this.state.dogs.filter((dog: dogData) => {
      return this.state.favorites.includes(dog.id);
    });
  };

  featureableDogs = () => {
    return this.state.dogs.filter((dog: dogData) => {
      return !this.state.favorites.includes(dog.id);
    });
  };

  filterDogsByTemperament = (personality: personalityState) => {
    let filterDogs: dogData[] = [];
    this.state.dogs.forEach((dog: dogData) => {
      personality.traits.forEach((mood: string) => {
        if (
          dog.temperament !== undefined &&
          dog.temperament.includes(mood) &&
          !filterDogs.includes(dog)
        ) {
          filterDogs.push(dog);
        }
      });
      return filterDogs;
    });

    this.setState({ ...this.state, filteredDogs: filterDogs });
  };

  render() {
    return (
      <main className="App">
        <nav className="nav">
          <NavLink to="/" style={{ textDecoration: "none" }}>
            <div className="logo-title">
              <img src={logo} className="logo" alt="canine cupid logo" />
              <h1 className="app-title">Canine Cupid</h1>
              <h4 className="subheader">· A Wag Worthy Match ·</h4>
            </div>
          </NavLink>
          <div className="links">
            <Route exact path="/favorites">
              <NavLink
                to="/matches"
                style={{
                  color: "white",
                  textDecoration: "none",
                  backgroundColor: "#E53950",
                  borderRadius: ".6rem",
                  padding: ".5rem",
                  marginRight: "2rem",
                }}
              >
                Matches
              </NavLink>
            </Route>
            <Route exact path={["/matches", "/"]}>
            <NavLink
              to="/favorites"
              style={{
                color: "white",
                textDecoration: "none",
                backgroundColor: "#E53950",
                borderRadius: ".6rem",
                padding: ".5rem",
                marginRight: '2rem',
              }}
            >
              Favorites
            </NavLink>
            </Route>
          </div>
        </nav>
        <Switch>
          <Route
            path="/error"
            render={() => (
              <Error
                url={this.state.errorImageURL}
              />
            )}
          />
          <Route exact path="/">
            {this.state.error ? (
              <Redirect to="/error" />
            ) : (
              <div className="home-page">
                <MoodForm
                  filterDogsByTemperament={this.filterDogsByTemperament}
                />
                <FeaturedDogs
                  dogs={this.featureableDogs()}
                  onToggleFavorite={this.onToggleFavorite}
                />
              </div>
            )}
          </Route>
          <Route
            exact
            path="/matches"
            render={() => (
              <Matches
                filteredDogs={this.state.filteredDogs}
                favorites={this.state.favorites}
                onToggleFavorite={this.onToggleFavorite}
              />
            )}
          />
          <Route
            exact
            path="/favorites"
            render={() => (
              <div className="home-page">
              <Favorites
                favoriteDogs={this.favoriteDogs()}
                onToggleFavorite={this.onToggleFavorite}
              />
              </div>
            )}
          />
          <Route
            exact path="/breeds/:breed"
            render={({ match }) => {
              return (
                <div className="home-page">
                <DogInfo breed={match.params.breed} dogs={this.state.dogs} />
                </div>
              );
            }}
          />
          <Route render={() => <Redirect to={{ pathname: "/" }} />} />
        </Switch>
      </main>
    );
  }
}

export default App;
