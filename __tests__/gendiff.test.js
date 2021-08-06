import { expect, test } from '@jest/globals';
import genDiff from '../src/gendiff.js';

test('plain data test', () => {
  const data1 = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };
  const data2 = {
    timeout: 20,
    verbose: true,
    host: 'hexlet.io',
  };
  const result = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  expect(genDiff(data1, data2)).toEqual(result);
});

test('empty data test', () => {
  const data1 = {};
  const data2 = {};
  const result = `{
}`;

  expect(genDiff(data1, data2)).toEqual(result);
});
