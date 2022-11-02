type personalityState = {
  name: string;
  description: string;
  traits: string[];
};

const MoodCard = ({ personality }: { personality: personalityState }) => {
  return (
    <div className="mood-card">
      <h2>{personality.name}</h2>
      <p>{personality.description}</p>
    </div>
  );
};

export default MoodCard;
