import { moodState, personalityState } from "../../utilities/interfaces";
import "./MoodForm.css";
import { Link } from "react-router-dom";
import { Component } from "react";
import MoodCard from "../MoodCard/MoodCard";

class MoodForm extends Component<
  { filterDogsByTemperament: Function },
  moodState
> {
  state: moodState = {
    debater: {
      name: "The Debater",
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
      color: "#FC766A",
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
      color: "#FC766A",
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
      color: "#FC766A",
    },
    virtuoso: {
      name: "The Virtuoso",
      description:
        "Quiet and mystical tinkerers, who enjoys a good book and cats",
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
      color: "#FC766A",
    },
    entertainer: {
      name: "The Entertainer",
      description: "Spontaneous and energetic extrovert who loves other people",
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
      color: "#FC766A",
    },
    mediator: {
      name: "The Mediator",
      description: "Poetic, kind, altruistic people eager to help others",
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
      color: "#FC766A",
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
      color: "#FC766A",
    },
    chosenPersonality: {
      name: "",
      description: "",
      traits: [""],
      color: "",
    },
  };

  selectedDog = (personality: personalityState) => {
    const personalityKeys = Object.keys(this.state);
    personalityKeys.forEach((personality: string) => {
      if (this.state[personality as keyof moodState].color === "yellow") {
        this.state[personality as keyof moodState].color = "#FC766A";
      }
    });
    personality.color = "yellow";
    this.setState({ chosenPersonality: personality });
  };

  render() {
    const personalityKeys = Object.keys(this.state);
    const allPersonalities = personalityKeys.map((personality: string) => {
      if (personality !== "chosenPersonality") {
        return (
          <MoodCard
            personality={this.state[personality as keyof moodState]}
            selectDog={this.selectedDog}
            key={personality}
          />
        );
      }
    });
    return (
      <div className="mood-form">
        <h2>Choose A Personality</h2>
        <div className="mood-container">{allPersonalities}</div>
        <Link to="/matches">
          <button
            className="submit-button"
            onClick={() =>
              this.props.filterDogsByTemperament(this.state.chosenPersonality)
            }
          >
            Find A Match!
          </button>
        </Link>
      </div>
    );
  }
}

export default MoodForm;
