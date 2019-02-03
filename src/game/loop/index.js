import render from '@/game/render';

export const loop = () => {
  render.render();
  requestAnimationFrame(loop);
};
