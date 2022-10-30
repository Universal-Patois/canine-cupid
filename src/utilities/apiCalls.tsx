export const fetchDogData = async () => {
  try {
    const response =  await fetch('https://api.thedogapi.com/v1/breeds', {
      method: 'GET',
      headers: new Headers({
        'x-api-key': 'live_nyndlWo6xS4OlXnfyjh3wossGpTP0EL3m5D24PUwvXibPzqbWeQ8vWrFSPsG0UgV'
      })
    })
    const data = await response.json()
    
    if(!response.ok) {
      throw Error('Data could not be fetched')
    }
    return data
  } catch(error) {
    console.log(error)
    // error => this.props.setState({error: error})
  }
}

// export const fetchDogData = () => {
//   fetch('https://api.thedogapi.com/v1/breeds', {
//     method: 'GET',
//     headers: new Headers({
//       'x-api-key': 'live_nyndlWo6xS4OlXnfyjh3wossGpTP0EL3m5D24PUwvXibPzqbWeQ8vWrFSPsG0UgV'
//     })
//   })
//   .then(response => response.json())
// }


//Api key
// live_nyndlWo6xS4OlXnfyjh3wossGpTP0EL3m5D24PUwvXibPzqbWeQ8vWrFSPsG0UgV