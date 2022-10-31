import './MoodForm.css'
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

const MoodForm = ({ dogs }: {dogs: dogData[]}) => {
    let checkedMoods: string[] = []
    const handleChange = (event: any) => {
        if(checkedMoods.length === 10) {
            alert('You can only choose 10 moods!')
            event.target.checked = false
        }
        else if(event.target.checked === true && !checkedMoods.includes(event.target.name)) {
            checkedMoods.push(event.target.name)
        } else if (event.target.checked === false) {
        let falseCheckedBox: number = checkedMoods.indexOf(event.target.name)
        checkedMoods.splice(falseCheckedBox, 1)
        }
        console.log(checkedMoods)
    }
    const temperamentArray = dogs.flatMap((dog : dogData) => {
        if(dog.temperament !== undefined) {
            return dog.temperament.split(', ')
        }
        
            })
            let uniqueMoods: string[] = []
            temperamentArray.forEach((temp: any) => {
                if(!uniqueMoods.includes(temp) && temp !== undefined) {
                    uniqueMoods.push(temp)
        }
    })
       const moodForm = uniqueMoods.map((mood: string) => {
return (

<div className="mood-buttons">


  <div>
    <input
      type="checkbox"
      key={mood}
      value={mood}
      name={mood}
      onClick={e => handleChange(e)}
    />
  </div>
  <label>{mood}</label>
</div>
)

        })
        return (
            <div className='mood-form'>
                <h2>Choose 10 Moods:</h2>
                <div className='mood-form-checkbox'>
                {moodForm}
                </div>
                <button className='submit-button'>Find A Match!</button>
            </div>
        
    )
}

export default MoodForm;