<template>
  <div></div>
</template>

<script>
import skiGame from '@/boot';
export default {
  data() {
    return {
      game: skiGame,
    };
  },
  computed: {},
  methods: {},
  created() {
    this.game.boot();
  },
};
</script>

<style type="text/css">
html,
body {
  margin: 0;
  padding: 0;
}
</style>
