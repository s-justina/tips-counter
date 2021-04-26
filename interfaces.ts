export type JarContent = number[];

export interface CoinsQuantity {
  coinsQuantity: number;
}

export interface OneRoll {
  [key: number]: CoinsQuantity;
}

export interface SegregatedDenomination {
  [key: number]: JarContent;
}

export interface CountedCoins {
  properDenomination: number;
  rolls: number;
  rest: number;
}

export interface ExpectedOutputOfCountedCoins {
  [key: number]: {
    rolls: number;
    rest: number;
  };
}
