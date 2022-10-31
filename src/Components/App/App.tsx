import React from 'react'
import { fetchDogData } from '../../utilities/apiCalls'
import { Props} from '../../utilities/interfaces'
import FeaturedDogs from '../FeaturedDogs/FeaturedDogs'
import './App.css'



class App extends React.Component<{}, {dogs: [], error: string}> {
  constructor(props: Props) {
    super(props)
    this.state = {
      dogs: [],
      error: ''
    }
  }

componentDidMount(): void {
  fetchDogData()
  .then(data => this.setState({dogs: data}))
  .catch(error => this.setState({error: error}))
}


  render() {
    return (
      <main className='main-page'>
        <h1 className='app-title'>Canine Cupid - A Wag Worthy Match</h1>
        <div className='featured-dogs-section'>
          <FeaturedDogs dogs={this.state.dogs}/>
        </div>
      </main>
    )
  }
}


export default App;