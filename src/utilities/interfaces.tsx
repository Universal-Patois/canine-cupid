export interface dogData {
  [x: string]: any;
  slice(arg0: number, arg1: number): unknown;
  weight: {
    imperial: string;
    metric: string;
  };
  height: {
    imperial: string;
    metric: string;
  };
  id: number;
  name: string;
  bred_for: string;
  breed_group: string;
  life_span: string;
  temperament: string;
  origin: string;
  reference_image_id: string;
  image: {
    id: string;
    width: number;
    height: number;
    url: string;
  };
}

export interface Props {
  dogs: dogData[];
}

export interface personalityState {
  name: string;
  description: string;
  traits: string[];
}

export interface moodState {
  debator: personalityState;
  athlete: personalityState;
  commander: personalityState;
  virtuoso: personalityState;
  entertainer: personalityState;
  mediator: personalityState;
  defender: personalityState;
  chosenPersonality: personalityState;
}
