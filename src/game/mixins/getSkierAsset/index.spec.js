import subject from './';
import sinon from 'sinon';
import * as mixins from '../../mixins/index';

describe('getSkierAsset', () => {
  it('based on getSkier', function() {
    let skier = {
      direction: 0,
    };
    let spy = sinon.stub(mixins, 'getSkier').returns(skier);
    let asset = subject.getSkierAsset();
    sinon.assert.calledOnce(spy);
    expect(asset).toBe('skierCrash');
  });
});
