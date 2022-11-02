import { Props, dogData, moodState } from "../../utilities/interfaces";
import "./MoodForm.css";
import { Link } from "react-router-dom";
import { Component } from "react";
import MoodCard from "../../MoodCard/MoodCard";

// const MoodForm = ({
//   dogs,
//   filterDogsByTemperament,
// }: {
//   dogs: dogData[];
//   filterDogsByTemperament: Function;
// }) => {
//   let checkedMoods: string[] = [];
//   let uniqueMoods: string[] = [];
//   const handleChange = (event: any) => {
//     if (checkedMoods.length === 10) {
//       alert("You can only choose 10 moods!");
//       event.target.checked = false;
//     } else if (
//       event.target.checked === true &&
//       !checkedMoods.includes(event.target.name)
//     ) {
//       checkedMoods.push(event.target.name);
//     } else if (event.target.checked === false) {
//       let falseCheckedBox: number = checkedMoods.indexOf(event.target.name);
//       checkedMoods.splice(falseCheckedBox, 1);
//     }
//   };
//   const temperamentArray = dogs.flatMap((dog: dogData) => {
//     if (dog.temperament !== undefined) {
//       return dog.temperament.split(", ");
//     }
//   });
//   temperamentArray.forEach((temp: any) => {
//     if (!uniqueMoods.includes(temp) && temp !== undefined) {
//       uniqueMoods.push(temp);
//     }
//   });
//   const moodForm = uniqueMoods.map((mood: string) => {
//     return (
//       <div className="mood-buttons" key={mood}>
//         <div>
//           <input
//             type="checkbox"
//             value={mood}
//             name={mood}
//             onClick={(e) => handleChange(e)}
//           />
//         </div>
//         <label>{mood}</label>
//       </div>
//     );
//   });
//   return (
//     <div className="mood-form">
//       <h2>Choose up to 10 Moods:</h2>
//       <div className="mood-form-checkbox">{moodForm}</div>
//       <Link to="/matches">
//         <button
//           className="submit-button"
//           onClick={() => filterDogsByTemperament(checkedMoods)}
//         >
//           Find A Match!
//         </button>
//       </Link>
//     </div>
//   );
// };

// interface moodState {
//   debator: { name: string; description: string; traits: string[] };
//   athlete: { name: string; description: string; traits: string[] };
//   commander: { name: string; description: string; traits: string[] };
//   virtuoso: { name: string; description: string; traits: string[] };
//   entertainer: { name: string; description: string; traits: string[] };
//   mediator: { name: string; description: string; traits: string[] };
//   defender: { name: string; description: string; traits: string[] };
// }

class MoodForm extends Component<{}, moodState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      debator: {
        name: "The Defender",
        description:
          "Curious and strategic thinkers with a plan for everything who cannot resist an intellectual challenge",
        traits: [
          "Cunning",
          "Clever",
          "Cautious",
          "Self-confidence",
          "Suspicious",
          "Keen",
          "Inquisitive",
          "Curious",
          "Mischievous",
          "Intelligent",
          "Even-tempered",
          "Alert",
        ],
      },
      athlete: {
        name: "The Athlete",
        description: "Always thinking on the move and ready for action",
        traits: [
          "Active",
          "Athletic",
          "Agile",
          "Quick",
          "Energetic",
          "Excitable",
          "Fast",
          "Attentive",
          "Responsive",
          "Playful",
          "Spunky",
          "Spirited",
          "Strong",
        ],
      },
      commander: {
        name: "The Commander",
        description:
          "Bold and imaginative strong-willed leaders, always finding a way - or making one",
        traits: [
          "Aggressive",
          "Dominant",
          "Assertive",
          "Bossy",
          "Feisty",
          "Fierce",
          "Opinionated",
          "Powerful",
          "Self-important",
          "Territorial",
          "Determined",
          "Stubborn",
          "Strong willed",
        ],
      },
      virtuoso: {
        name: "The Virtuoso",
        description:
          "Spontaneous and energetic extrovert who loves other people",
        traits: [
          "Diligent",
          "Cat-like",
          "Rational",
          "Calm",
          "Composed",
          "Dignified",
          "Independent",
          "Sensitive",
          "Steady",
          "Quiet",
          "Refined",
          "Bright",
          "Gentle",
          "Aloof",
        ],
      },
      entertainer: {
        name: "The Entertainer",
        description:
          "Spontaneous and energetic extrovert who loves other people",
        traits: [
          "Bubbly",
          "Boisterous",
          "Cheerful",
          "Charming",
          "Friendly",
          "Fun-loving",
          "Easygoing",
          "Gay",
          "People-oriented",
          "Outgoing",
          "Sociable",
          "Good-tempered",
          "Lively",
          "Merry",
          "Happy",
          "Joyful",
          "Clownish",
        ],
      },
      mediator: {
        name: "The Mediator",
        description: "Poetic, kind, altruisitic people eager to help others",
        traits: [
          "Companionable",
          "Affectionate",
          "Amiable",
          "Benevolent",
          "Loving",
          "Lovable",
          "Eager",
          "Familial",
          "Generous",
          "Kind",
          "Patient",
          "Docile",
          "Great-hearted",
          "Sweet-tempered",
        ],
      },
      defender: {
        name: "The Defender",
        description:
          "Very dedicated and warm protectors, who defend their loved ones",
        traits: [
          "Protective",
          "Loyal",
          "Dutiful",
          "Devoted",
          "Obedient",
          "Watchful",
          "Trainable",
          "Reliable",
          "Respectful",
          "Stable",
          "Self-assured",
          "Responsible",
          "Faithful",
          "Proud",
        ],
      },
    };
  }

  render() {
    const personalityKeys = Object.keys(this.state);
    personalityKeys.map((personality: string) => {
      <MoodCard personality={this.state[personality as keyof moodState]} />;
    });
    return (
      <Link to="/matches">
        <button
          className="submit-button"
          // onClick={() => filterDogsByTemperament(checkedMoods)}
        >
          Find A Match!
        </button>
      </Link>
    );
  }
}

export default MoodForm;
