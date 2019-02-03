# Skigame

**TL;DR**
([play the game](http://www.quickerleft.com))

Find updated code in [/src/game/](https://github.com/davewoodall/skigame/tree/master/src/game)

_View initial [game.js](/old_game_one_file/js/game.js)_;

## Table of contents

- [Background](#Background)
- [Directory Structure](#directory-structure)
- [Unit Tests](#unit-tests)
- [Local setup](#Local-setup)

- **Summary of Work**
  - [Step 1. Mount game](#Step-1-Mount-game)
  - [Step 2. Separate State](#Step-2-Separate-State)
  - [Step 3. Encapsulate Functions](#Step-3-Encapsulate-Functions)
  - [Step 4. Fix bug](#Step-4-Fix-bug)
  - [Step 5. Add Scoring Feature](#Step-5-Add-Scoring-Feature)
  - [Step 6. Deploy](#Step-6-Deploy)
  - [Step 7. What’s next](#Step-7-What’s-next)

## Background

I was provided this code base and asked to fix it. It had bugs and no tests. It did many things in one function. In the context of the game, the state was global and many functions had access to it, making it hard to change. There were magic numbers that did not communicate the intent of those numbers. There was code duplication. While this code could technically run in production, it was not minified and the game loop was firing extra functions which burned unnecessary CPU. To summarize this in bullet form. The code base problems include:

- The Game was one function made up of many tightly coupled functions
- No separation of concerns
- No tests
- Global state
- Difficult to modify
- Not production grade

## Directory Structure

Based on my limited understanding of game architecture, I divided the app into 3 primiary directories. Rather than _MVC_ I opted for _Boot, Render, Loop_

### boot/

Manage all the inital activities to boot the game

### render/

Manages the activities that occur during the loop.

### loop/

Smallest of three directories, but the loop is central to the game process. I felt it important to have the loop available for modifications.

### supporting directories

- `mixins/` are helper functions
- `constants/` manage static resources
- `store/` manages state

## Unit tests

One of the benfits of webpack is the ability to have tests sit right next to the source code. My preference is to create a directory named after the module and then have the source be represented in `index.js` and the test sit right beside as `indes.spec.js`. I added some tests to demonstrate an ability to do so. However to cover each of the modules was beyond the scope of this project, in regard to time limit. If I had the time, I would cover each module with a test. That is the only way I know to effectively refactor with confidence.

Here are examples with [getSkierAsset](https://github.com/davewoodall/skigame/tree/master/src/game/mixins/getSkierAsset) and [score](https://github.com/davewoodall/skigame/tree/master/src/game/render/score)

## Local setup

```
clone repo

cd into repo

npm install

npm test

npm start

open http://localhost:8080/
```

## Step 1. Mount game

I wanted to find an easy way to ensure the game continued working as I made changes. I didn’t want to keep refreshing the browser, so I put the game, as-is, into a new Vue app, created by the [vue-cli](https://cli.vuejs.org/). The Vue CLI provides many modern features. The initial benefit being hot module reloading. I was able to poke around with the code and immediately watch if (when) I broke something.

### Benefits of vue-cli

- Modern development environment
- Modules for Encapsulation
- Manage state separate from behavior
- Build compiles, minifies, and cache management.
- Deployment as a static app (no server required)

## Step 2. Separate State

Once I had the game in the new app environment, my next task was to separate the global state into a state manager. Specifically, [Vuex](https://vuex.vuejs.org/). Vuex does a great job of keeping data housed nicely in a state pattern. With more time, I would break state down into subjects, but that is a trivial exercise. For the purposes of this demo, I kept all 4 parts (state, getters, actions, mutations) in a single `/src/store.js`.

## Step 3. Encapsulate Functions

In order to reason about the code, I wanted to break it down into encapsulated actions. I did so by taking each of the functions and putting them in their own module. The benefit of this is that they are self stand alone modules that can be focused on and improved in isolation. In this context, it becomes easier to see where, how, and when to add tests, which is the first step before refactoring any of these functions.

## Step 4. Fix bug

Once I had the code working as initially received, I was able to focus on the initial bug, which was that the game breaks upon left turning after a crash. The closest I got was to discover that the `skierImage` was returning `undefined`. I was not able to locate what was making that specific `Image()` object become `undefined`. I created a `/src/game/mixins/hotfix.js` to patch the bug. The expectation is that as I add tests and refactor the functions, I will eventually uncover what is making that `Image ()` `undefined`. (My theory is something is overriding it by accident)

## Step 5. Add Scoring Feature

I opted for the feature of the score. I wanted to add a Vue component (`/src/components/ScoreBoard/`)and felt that feature would demonstrate how easy and wonderful it is to work with components.

### Score

The score logic is basic. If the skier is moving, it tallys points. If the skier is not moving, it does not tally points. If the skiier crashes, restart the score.

### HighScore

If a player reaches high score, they are notified. Upon the end of their game, the score will be made into high score.

- Store manages state

## Step 6. Deploy

The vue cli has a built in `build` task which concatenates, minifies, and hashifys the build. Upon running the build task, I deployed the directory to github.

You can: [play the finished game](http://www.quickerleft.com)

## Step 7. What’s next

If I had more time I would do the following:

- Add tests to functions, in order to refactor functions, in the spirit of removing duplication and improving performance
- Make skiier asset management logic more generic so that I can incorporate jumps and attacks using same functions.
- Try to optimize the game loop. There seems to be some more efficient ways to render, but I didn’t get that deep.
- Add touch screen controls
- User login / keep scores
- Add config for user settings (game speed, images sizes, image quantity)
- Add music
