import { isUnassigned, isNumber, isString, isNonEmptyString } from './primitives-guards.js';

describe('primitive-guards -> isUnassigend', () => {
  it('input null expect true', () => {
    expect(isUnassigned(null)).toBe(true);
  });
  it('input undefined expect true', () => {
    expect(isUnassigned(undefined)).toBe(true);
  });
  it('input number expect false', () => {
    expect(isUnassigned(5)).toBe(false);
  });
  it('input object expect false', () => {
    expect(isUnassigned({})).toBe(false);
  });
  it('input function expect false', () => {
    expect(isUnassigned(() => {})).toBe(false);
  });
  it('input string expect false', () => {
    expect(isUnassigned('undefined')).toBe(false);
  });
});

describe('primitive-guards -> isNumber', () => {
  it('input 46 expect true', () => {
    expect(isNumber(46)).toBe(true);
  });
  it('input 0 expect true', () => {
    expect(isNumber(0)).toBe(true);
  });
  it('input NaN expect false', () => {
    expect(isNumber(NaN)).toBe(false);
  });
  it('input "7" expect false', () => {
    expect(isNumber('7')).toBe(false);
  });
  it('input [] expect false', () => {
    expect(isNumber([])).toBe(false);
  });
});

describe('primitive-guards -> isString', () => {
  it('input null expect false', () => {
    expect(isString(null)).toBe(false);
  });
  it('input undefined expect false', () => {
    expect(isString(undefined)).toBe(false);
  });
  it('input number expect false', () => {
    expect(isString(5)).toBe(false);
  });
  it('input object expect false', () => {
    expect(isString({})).toBe(false);
  });
  it('input function expect false', () => {
    expect(isString(() => {})).toBe(false);
  });
  it('input string expect true', () => {
    expect(isString('undefined')).toBe(true);
  });
  it('input empty string expect true', () => {
    expect(isString('')).toBe(true);
  });
});

describe('primitive-guards -> isNonEmptyString', () => {
  it('input null expect false', () => {
    expect(isNonEmptyString(null)).toBe(false);
  });
  it('input undefined expect false', () => {
    expect(isNonEmptyString(undefined)).toBe(false);
  });
  it('input number expect false', () => {
    expect(isNonEmptyString(5)).toBe(false);
  });
  it('input object expect false', () => {
    expect(isNonEmptyString({})).toBe(false);
  });
  it('input function expect false', () => {
    expect(isNonEmptyString(() => {})).toBe(false);
  });
  it('input string expect true', () => {
    expect(isNonEmptyString('undefined')).toBe(true);
  });
  it('input empty string expect false', () => {
    expect(isNonEmptyString('')).toBe(false);
  });
});
