import React, { Component } from 'react'
import { fetchDogData } from '../../utilities/apiCalls'
import { dogData, Props} from '../../utilities/interfaces'
import FeaturedDogs from '../FeaturedDogs/FeaturedDogs'


class App extends React.Component {
  constructor(props: Props) {
    super(props)
    this.state = {
      dogs: []
    }
  }

componentDidMount(): void {
  fetchDogData()
}

  render() {
    return (
      <main>
        <h1 className='app-title'>Canine Cupid - A Wag Worthy Match</h1>
      </main>
    )
  }
}


export default App;