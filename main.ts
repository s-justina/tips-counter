import { CountedCoins, ExpectedOutputOfCountedCoins, JarContent, SegregatedDenomination } from './interfaces';
import { oneRoll } from './data';

export enum Denomination {
  ONE = 1,
  TWO,
  FIVE = 5,
  TEN = 10,
  TWENTY = 20,
  FIFTY = 50,
}

const denominationInLoop: { [key: number]: string } = {
  0: 'ONE',
  1: 'TWO',
  2: 'FIVE',
  3: 'TEN',
  4: 'TWENTY',
  5: 'FIFTY',
};

let denomination1: JarContent = [];
let denomination2: JarContent = [];
let denomination5: JarContent = [];
let denomination10: JarContent = [];
let denomination20: JarContent = [];
let denomination50: JarContent = [];

export const coinsCounter = (jarOfCoins: JarContent): ExpectedOutputOfCountedCoins => {
  const segregatedDenomination = segregateDenomination(jarOfCoins);
  const countedCoins = countRollsDependsDenomination(segregatedDenomination);
  return convertArrayToExpectedObject(countedCoins);
};

export const segregateDenomination = (jarOfCoins: JarContent): SegregatedDenomination => {
  let segregatedDenomination: SegregatedDenomination = {
    [Denomination.ONE]: denomination1,
    [Denomination.TWO]: denomination2,
    [Denomination.FIVE]: denomination5,
    [Denomination.TEN]: denomination10,
    [Denomination.TWENTY]: denomination20,
    [Denomination.FIFTY]: denomination50,
  };

  for (let i = 0; i < jarOfCoins.length; i++) {
    if (!jarOfCoins[i]) {
      continue;
    }

    // segregatedDenomination[jarOfCoins[i]] &&
    //   (segregatedDenomination[jarOfCoins[i]] = [...segregatedDenomination[jarOfCoins[i]], jarOfCoins[i]]); <-- this one is 9x slower than push

    segregatedDenomination[jarOfCoins[i]]?.push(jarOfCoins[i]);
  }
  return segregatedDenomination;
};

export const countRollsDependsDenomination = (segregatedDenomination: SegregatedDenomination): CountedCoins[] => {
  const quantitiesOfDenomination = Object.values(segregatedDenomination);
  return quantitiesOfDenomination.map((quantity, i) => {
    const value: string = denominationInLoop[i];
    const properDenomination: number = Denomination[value as keyof typeof Denomination];
    const divide = quantity.length / oneRoll[properDenomination].coinsQuantity;
    const rolls = +divide.toString().split('.')[0];
    const rest = quantity.length % oneRoll[properDenomination].coinsQuantity;
    return { properDenomination, rolls, rest };
  });
};

export const convertArrayToExpectedObject = (array: CountedCoins[]): ExpectedOutputOfCountedCoins => {
  const initialValue = {};

  return array.reduce((obj, item: CountedCoins) => {
    return {
      ...obj,
      [item.properDenomination]: {
        rolls: item['rolls'],
        rest: item['rest'],
      },
    };
  }, initialValue);
};
