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

export const generateText = (difficulty: Difficulty, timeInSeconds: number): string => {
  let sourceTexts: string[];
  switch (difficulty) {
    case Difficulty.Easy:
      sourceTexts = easyTexts;
      break;
    case Difficulty.Medium:
      sourceTexts = mediumTexts;
      break;
    case Difficulty.Hard:
      sourceTexts = hardTexts;
      break;
    default:
      sourceTexts = mediumTexts;
  }

  // Target character count based on an average typing speed of 45 WPM.
  // (time in minutes) * (WPM) * (average characters per word)
  const targetChars = (timeInSeconds / 60) * 45 * 5;

  let phrases: string[] = [];
  let currentChars = 0;
  
  // Ensure we get at least one phrase
  if (sourceTexts.length > 0) {
      phrases.push(getRandomText(sourceTexts));
      currentChars = phrases[0].length;
  } else {
      return "";
  }
  
  // Keep adding phrases until we meet the target character count.
  while (currentChars < targetChars && sourceTexts.length > 1) {
    let newPhrase = getRandomText(sourceTexts);
    // Avoid adding the same phrase back-to-back.
    if (newPhrase === phrases[phrases.length - 1]) {
        continue;
    }
    phrases.push(newPhrase);
    currentChars = phrases.join(' ').length;
  }

  return phrases.join(' ');
};