import render from '@/loop/render';

const loop = () => {
  render.render();
  requestAnimationFrame(loop);
};

export default {
  loop,
};
