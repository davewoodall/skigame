import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  getters: {
    score(state) {
      return state.score;
    },
    highScore(state) {
      return state.highScore;
    },
    prevMove(state) {
      return state.prevMove;
    },
    ctx(state) {
      return state.ctx;
    },
    skier(state) {
      return state.skier;
    },
    game(state) {
      return state.game;
    },
    obstacles(state) {
      return state.obstacles;
    },
    loadedAssets(state) {
      return state.loadedAssets;
    },
  },
  state: {
    score: 0,
    highScore: 0,
    prevMove: 0,
    ctx: 0,
    skier: {
      direction: 5,
      mapX: 0,
      mapY: 0,
      speed: 8,
    },
    game: {
      width: 0,
      height: 0,
    },
    obstacles: [],
    obstacleTypes: ['tree', 'treeCluster', 'rock1', 'rock2'],
    loadedAssets: {},
  },
  mutations: {
    tick(state, data) {
      state.score = data;
    },
    skierDirection(state, data) {
      state.skier.direction = data;
    },
    skierMapX(state, data) {
      state.skier.mapX = data;
    },
    skierMapY(state, data) {
      state.skier.mapY = data;
    },
    skierSpeed(state, data) {
      state.skier.speed = data;
    },
    gameWidth(state, data) {
      state.game.width = data;
    },
    gameHeight(state, data) {
      state.game.height = data;
    },
    ctx(state, data) {
      state.ctx = data;
    },
    pushObstalce(state, data) {
      state.obstacles.push(data);
    },
    newObstacles(state, data) {
      state.obstacles = data;
    },
    loadedAssets(state, data) {
      let assetName = data[0];
      let assetImage = data[1];
      state.loadedAssets[assetName] = assetImage;
    },
    setScore(state, data) {
      state.score = data;
    },
    setHighScore(state, data) {
      state.highScore = data;
    },
    prevMove(state, data) {
      state.prevMove = data;
    },
  },
  actions: {
    tick({ commit }, data) {
      commit('tick', data);
    },
    ctx({ commit }, data) {
      commit('ctx', data);
    },
    skierDirection({ commit }, data) {
      commit('skierDirection', data);
    },
    skierMapX({ commit }, data) {
      commit('skierMapX', data);
    },
    skierMapY({ commit }, data) {
      commit('skierMapY', data);
    },
    skierSpeed({ commit }, data) {
      commit('skierSpeed', data);
    },
    gameWidth({ commit }, data) {
      commit('gameWidth', data);
    },
    gameHeight({ commit }, data) {
      commit('gameHeight', data);
    },
    pushObstalce({ commit }, data) {
      commit('pushObstalce', data);
    },
    newObstacles({ commit }, data) {
      commit('newObstacles', data);
    },
    loadedAssets({ commit }, data) {
      commit('loadedAssets', data);
    },
    setScore({ commit }, data) {
      commit('setScore', data);
    },
    setHighScore({ commit }, data) {
      commit('setHighScore', data);
    },
  },
});
