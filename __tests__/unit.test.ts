// unit test
import { convertArrayToExpectedObject, countRollsDependsDenomination, segregateDenomination } from '../main';
import { inputData } from '../data';
import { countedRollsDependsDenominationExpectedData, segregatedMock } from './mockedData';

describe('Test of segregateDenomination function', () => {
  it('Should segregate input coins into object of arrays by denomination - with corrupted payload should also work correctly', () => {
    expect(segregateDenomination([...inputData.slice(0, 20), NaN, 60, 122])).toStrictEqual({
      '1': [1, 1],
      '2': [2, 2],
      '5': [5, 5, 5],
      '10': [10, 10, 10, 10, 10, 10, 10, 10, 10],
      '20': [20],
      '50': [50, 50, 50],
    });
  });
});

describe('Test of countRollsDependsDenomination function', () => {
  it('Should count rolls and rest according denomination', () => {
    expect(countRollsDependsDenomination(segregatedMock)).toStrictEqual(countedRollsDependsDenominationExpectedData);
  });
});

describe('Test of convertArrayToExpectedObject function', () => {
  it('Should convert value to expected format', () => {
    expect(convertArrayToExpectedObject(countedRollsDependsDenominationExpectedData)).toStrictEqual({
      1: { rolls: 0, rest: 24 },
      2: { rolls: 0, rest: 28 },
      5: { rolls: 0, rest: 21 },
      10: { rolls: 0, rest: 28 },
      20: { rolls: 1, rest: 3 },
      50: { rolls: 0, rest: 26 },
    });
  });
});
