
import { Difficulty } from '../types';

const easyTexts = [
  "the quick brown fox jumps over the lazy dog",
  "a journey of a thousand miles begins with a single step",
  "to be or not to be that is the question",
  "the early bird gets the worm",
  "actions speak louder than words",
  "an apple a day keeps the doctor away",
  "never underestimate the power of a good book"
];

const mediumTexts = [
  "The sun always shines brightest after the rain, offering a glimmer of hope.",
  "Technology has revolutionized the way we communicate, work, and live our daily lives.",
  "Creativity is intelligence having fun, so never be afraid to explore your ideas.",
  "In the world of programming, the only constant is change. Adaptability is key.",
  "A well-organized workspace can significantly boost productivity and reduce stress.",
  "Learning a new language opens up a world of possibilities and cultural understanding."
];

const hardTexts = [
  "Quantum computing, with its qubits and superposition, promises to solve problems (like cryptography) that are intractable for classical computers.",
  "The philosophical implications of artificial intelligence, particularly concerning consciousness and morality, are subjects of intense debate.",
  "Graphene's single-atom-thick lattice structure gives it remarkable strength and conductivity, opening doors for futuristic electronics (e.g., flexible screens).",
  "Exoplanetary research utilizes methods like transit photometry and radial velocity to detect planets orbiting distant stars, seeking Earth-like worlds.",
  "The intricate dance of supply and demand, influenced by geopolitical events and consumer behavior, dictates the global economic landscape."
];

const getRandomText = (texts: string[]): string => {
  return texts[Math.floor(Math.random() * texts.length)];
};

export const getText = (difficulty: Difficulty): string => {
  switch (difficulty) {
    case Difficulty.Easy:
      return getRandomText(easyTexts);
    case Difficulty.Medium:
      return getRandomText(mediumTexts);
    case Difficulty.Hard:
      return getRandomText(hardTexts);
    default:
      return getRandomText(mediumTexts);
  }
};
