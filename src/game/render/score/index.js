import {
  getSkier,
  setScore,
  getScore,
  setHighScore,
  getHighScore,
} from '../../mixins';

export const isMoving = () => {
  let skier = getSkier();
  let skierDirection = skier.direction;
  if (skierDirection > 1 && skierDirection < 5) {
    return skierDirection;
  }
  return false;
};

const tallyScore = (points = 10) => {
  let currentScore = getScore();
  let score = currentScore + points;
  setScore(score);
};

export const keepScore = () => {
  if (isMoving()) {
    tallyScore();
  }
};

export const updateHighScore = () => {
  let currentHighScore = getHighScore();
  let currentScore = getScore();
  if (currentScore > currentHighScore) {
    setHighScore(currentScore);
  }
  return currentScore;
};

export const manageScore = () => {
  updateHighScore();
  resetScore();
};

export const resetScore = () => {
  let skier = getSkier();
  let skierDirection = skier.direction;
  if (skierDirection === 0) {
    setScore(0);
  }
};
