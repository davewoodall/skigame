import { isMoving, updateHighScore, resetScore } from './';
import sinon from 'sinon';
import * as mixins from '../../mixins/';

describe('Helper Methods', () => {
  describe('Movement is', function() {
    let spy;
    let skier;

    beforeEach(() => {
      spy = sinon.stub(mixins, 'getSkier');
    });

    afterEach(() => {
      spy.restore();
      sinon.assert.calledOnce(spy);
    });

    it('left down', function() {
      skier = { direction: 2 };
      spy.returns(skier);
      expect(isMoving()).toBe(skier.direction);
    });

    it('down', function() {
      skier = { direction: 3 };
      spy.returns(skier);
      expect(isMoving()).toBe(skier.direction);
    });

    it('right down', function() {
      skier = { direction: 4 };
      spy.returns(skier);
      expect(isMoving()).toBe(skier.direction);
    });

    it('not just right', function() {
      skier = { direction: 5 };
      spy.returns(skier);
      expect(isMoving()).toBe(false);
    });

    it('not just left', function() {
      skier = { direction: 1 };
      spy.returns(skier);
      expect(isMoving()).toBe(false);
    });

    it('not when crashed', function() {
      skier = { direction: 0 };
      spy.returns(skier);
      expect(isMoving()).toBe(false);
    });
  });
});

describe('Setting HighScore', () => {
  it('High Score', function() {
    let spy = sinon.stub(mixins, 'getHighScore').returns(100);
    let spy2 = sinon.stub(mixins, 'getScore').returns(110);
    expect(updateHighScore()).toBe(110);
    sinon.assert.calledOnce(spy);
    sinon.assert.calledOnce(spy2);
    spy.restore();
    spy2.restore();
  });
});

describe('Reseting Score', function() {
  it('does so on collision', function() {
    let skier = { direction: 0 };
    let spy = sinon.stub(mixins, 'setScore');
    let spy2 = sinon.stub(mixins, 'getSkier').returns(skier);
    resetScore();
    sinon.assert.calledOnce(spy);
    sinon.assert.calledOnce(spy2);
    spy.restore();
    spy2.restore();
  });
});
