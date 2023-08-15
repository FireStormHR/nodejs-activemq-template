import { tryc } from './tryc.js';

describe('execution -> tryc', () => {
  it('input error with log expect 5', () => {
    expect(
      tryc(() => {
        throw new Error('error');
      }, 5)
    ).toBe(5);
  });
  it('input error without log expect 5', () => {
    expect(
      tryc(
        () => {
          throw new Error('error');
        },
        5,
        false
      )
    ).toBe(5);
  });
  it('input 46 expect 46', () => {
    expect(tryc(() => 46, 5)).toBe(46);
  });
});
