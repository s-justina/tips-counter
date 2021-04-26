import { inputData } from '../data';
import { coinsCounter } from '../main';

// integration test
describe('Test coins-counter function', () => {
  it('Should count rolls and rest in depends of denomination', () => {
    expect(coinsCounter(inputData)).toStrictEqual({
      1: { rolls: 40, rest: 34 },
      2: { rolls: 40, rest: 10 },
      5: { rolls: 55, rest: 13 },
      10: { rolls: 33, rest: 40 },
      20: { rolls: 85, rest: 11 },
      50: { rolls: 42, rest: 12 },
    });
  });
});
