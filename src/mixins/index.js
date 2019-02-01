import store from '@/store';

export const getSkier = () => {
  return store.getters['skier'];
};

export const getSkierDirection = () => {
  return getSkier().direction;
};

export const getSkierMapX = () => {
  return getSkier().mapX;
};

export const getSkierMapY = () => {
  return getSkier().mapY;
};
export const getSkierSpeed = () => {
  return getSkier().speed;
};

export const getObstacles = () => {
  return store.getters['obstacles'];
};

export const getGameDimensions = () => {
  return store.getters['game'];
};
export const getGameWidth = () => {
  return getGameDimensions().width;
};

export const getGameHeight = () => {
  return getGameDimensions().height;
};

export const getCtx = () => {
  return store.getters['ctx'];
};
