import React from 'react';
import './App.css';
import MoodForm from './MoodForm'

// let dogs : { id: number, name: string, bred_for: string, breed_group: string, life_span: string, temperament: string, origin: string, reference_image_id: string }[] = []

interface dogData {
  weight: {
    imperial: string,
    metric: string
    },
  height: {
    imperial: string,
    metric: string
    },
  id: number,
  name: string,
  bred_for: string,
  breed_group: string,
  life_span: string,
  temperament: string,
  origin: string,
  reference_image_id: string,
  image: {
    id: string,
    width: number,
    height: number,
    url: string
    }
  
}

interface Props {
  dogs: dogData[]
}


class App extends React.Component<{}, {dogs: [], error: string}> {
  constructor(props: Props) {
    super(props);
    this.state = {
      dogs: [],
      error: ''
    }
  }

  componentDidMount() {
    fetch('https://api.thedogapi.com/v1/breeds')
    .then(resp => resp.json())
    .then(data => this.setState({dogs: data}))
    .then(err => this.setState({error: 'there was an issue'}))
  }

  render() {
    return  this.state ? <main>
      <header>
      <h1>Canine Cupid - A wag-Worthy Match</h1> 
      <button className='favorite-button'>Favorited Dogs</button>
      </header>
      <MoodForm dogs={this.state.dogs}/>
      </main>
      : <h1>Sorry an error occured</h1>
}
}

export default App;
