<template>
  <div>
    <ScoreBoard />
  </div>
</template>

<script>
import ScoreBoard from '@/components/ScoreBoard';
import skiGame from '@/game/boot';
export default {
  components: {
    ScoreBoard,
  },
  data() {
    return {
      game: skiGame,
    };
  },
  methods: {},
  created() {
    this.game.boot();
  },
};
</script>

<style type="text/css">
:root {
  --blue: #8cebff;
}
html,
body {
  margin: 0;
  background: var(--blue);
  box-sizing: border-box;
}
canvas {
  background: white;
}
</style>
