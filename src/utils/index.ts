import { Decimal } from 'decimal.js';

export const DelayTime = (time = 1000) =>
  new Promise(resolve => {
    setTimeout(resolve, time);
  });

/* Decimal */
const Decimal18 = Decimal.clone({ toExpNeg: -18 });

export const toFloatNum = (num: string) => {
  const xnum = new Decimal18(num);

  if (xnum.greaterThan(1)) {
    return xnum.toFixed(4);
  }
  return xnum.toPrecision(6);
};
