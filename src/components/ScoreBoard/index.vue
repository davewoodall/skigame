<template>
  <div class="scoreboard">
    <div class="scores">
      <div class="score" :class="newScoreClass">Score {{ score }}</div>
      <div v-if="newHighScore()">
        <div class="score score-hero">New High Score!!!</div>
      </div>
      <div class="score">High Score {{ highScore }}</div>
    </div>
  </div>
</template>

<script>
import { getScore, getHighScore } from '@/game/mixins';
export default {
  data() {
    return {
      newScoreClass: 'new-high-score',
    };
  },
  methods: {
    newHighScore() {
      if (this.score > 0) {
        if (this.score > this.highScore) {
          this.newScoreClass = 'new-high-score';
          return true;
        } else {
        }
      } else {
        this.newScoreClass = '';
      }
    },
  },
  computed: {
    score() {
      return getScore();
    },
    highScore() {
      return getHighScore();
    },
  },
};
</script>

<style lang="css" scoped>
.scoreboard {
  background: var(--blue);
  position: fixed;
  top: 0;
  width: 100%;
  left: 0;
}
.scores {
  display: flex;
  justify-content: space-around;
  padding: 1.2em;
  font-size: 1em;
}
.score {
  font-family: courier;
  background: white;
  padding: 0.5em;
}

.new-high-score {
  outline: 10px solid red;
}

.score-hero {
  background: yellow;
}
</style>
