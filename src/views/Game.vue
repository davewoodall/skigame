<template>
  <div>
    <small>timer: {{ skiScore }}</small>
  </div>
</template>

<script>
import game from '../game.js';
export default {
  data() {
    return {
      score: 0,
    };
  },
  computed: {
    skiScore() {
      this.$store.getters['time'];
      return this.$store.getters['time'];
    },
  },
  methods: {},
  created() {},
};
</script>

<style type="text/css">
html,
body {
  margin: 0;
  padding: 0;
}
</style>
