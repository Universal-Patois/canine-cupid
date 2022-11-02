export interface dogData {
  [x: string]: any
  slice(arg0: number, arg1: number): unknown
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
    id: string
    width: number,
    height: number,
    url: string
  } 
}

export interface Props {
  dogs: dogData[]
}

export interface moodState {
  debator: { name: string; description: string; traits: string[] };
  athlete: { name: string; description: string; traits: string[] };
  commander: { name: string; description: string; traits: string[] };
  virtuoso: { name: string; description: string; traits: string[] };
  entertainer: { name: string; description: string; traits: string[] };
  mediator: { name: string; description: string; traits: string[] };
  defender: { name: string; description: string; traits: string[] };
}
