import { describe, expect, test } from '@jest/globals';
import * as path from 'path';
import * as process from 'process';
import * as fs from 'fs';
import genDiff from '../src/gendiff.js';

const buildFullPath = (filepath) => {
  const workDirPath = process.cwd();
  return path.resolve(workDirPath, '__fixtures__', filepath);
};

const getFileData = (filepath) => fs.readFileSync(filepath, 'utf8');

const filepath1 = '__fixtures__/file1.json';
const filepath2 = '__fixtures__/file2.json';
const filepath3 = '__fixtures__/file1.yml';
const filepath4 = '__fixtures__/file2.yml';

describe('.json data test', () => {
  test('nested (stylish format)', () => {
    const resultFullPath = buildFullPath('result_stylish.txt');
    const expectedResult = getFileData(resultFullPath);
    const diffTree = genDiff(filepath1, filepath2, 'stylish');
    expect(diffTree).toEqual(expectedResult);
  });

  test('nested (plain format)', () => {
    const resultFullPath = buildFullPath('result_plain.txt');
    const expectedResult = getFileData(resultFullPath);
    const diffTree = genDiff(filepath1, filepath2, 'plain');
    expect(diffTree).toEqual(expectedResult);
  });

  test('nested (json format)', () => {
    const resultFullPath = buildFullPath('result_json.txt');
    const expectedResult = getFileData(resultFullPath);
    const diffTree = genDiff(filepath1, filepath2, 'json');
    expect(diffTree).toEqual(expectedResult);
  });
});

describe('.yml data test', () => {
  test('nested (stylish format)', () => {
    const resultFullPath = buildFullPath('result_stylish.txt');
    const expectedResult = getFileData(resultFullPath);
    const diffTree = genDiff(filepath3, filepath4, 'stylish');
    expect(diffTree).toEqual(expectedResult);
  });

  test('nested (plain format)', () => {
    const resultFullPath = buildFullPath('result_plain.txt');
    const expectedResult = getFileData(resultFullPath);
    const diffTree = genDiff(filepath3, filepath4, 'plain');
    expect(diffTree).toEqual(expectedResult);
  });

  test('nested (json format)', () => {
    const resultFullPath = buildFullPath('result_json.txt');
    const expectedResult = getFileData(resultFullPath);
    const diffTree = genDiff(filepath3, filepath4, 'json');
    expect(diffTree).toEqual(expectedResult);
  });
});
