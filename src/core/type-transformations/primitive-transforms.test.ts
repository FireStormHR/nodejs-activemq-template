import { toNumber } from './primitive-transforms.js';

describe('primitive-transforms -> toNumber', () => {
  it('input null expect undefined', () => {
    expect(toNumber(null as any)).toBe(undefined);
  });
  it('input undefined expect undefined', () => {
    expect(toNumber(undefined as any)).toBe(undefined);
  });
  it('input object expect undefined', () => {
    expect(toNumber({} as any)).toBe(undefined);
  });
  it('input function expect undefined', () => {
    expect(toNumber((() => {}) as any)).toBe(undefined);
  });
  it('input boolean expect undefined', () => {
    expect(toNumber(true as any)).toBe(undefined);
  });
  it('input string "undefined" expect undefined', () => {
    expect(toNumber('undefined')).toBe(undefined);
  });
  it('input number expect undefined', () => {
    expect(toNumber(5 as any)).toBe(5);
  });
  it('input string "46" expect 46', () => {
    expect(toNumber('46')).toBe(46);
  });
  it('input string "12e5" expect undefined', () => {
    expect(toNumber('12e5')).toBe(1200000);
  });
  it('input string "-125.5" expect undefined', () => {
    expect(toNumber('-125.5')).toBe(-125.5);
  });
  it('input string "123foo" expect undefined', () => {
    expect(toNumber('123foo')).toBe(123);
  });
  it('input string " 123 " expect undefined', () => {
    expect(toNumber(' 123 ')).toBe(123);
  });
  it('input string "0000004" expect undefined', () => {
    expect(toNumber('0000004')).toBe(4);
  });
});
