import { expect, test } from '@jest/globals';
import * as path from 'path';
import * as process from 'process';
import * as fs from 'fs';
import genDiff from '../src/gendiff.js';

const buildFullPath = (filepath) => {
  const workDirPath = process.cwd();
  return path.resolve(workDirPath, filepath);
};

const getFileData = (filepath) => fs.readFileSync(filepath, 'utf8');

const filepath1 = '__fixtures__/file1.json';
const filepath2 = '__fixtures__/file2.json';

test('nested data test (stylish format)', () => {
  const resultFilePath = '__fixtures__/result_stylish.txt';
  const resultFullPath = buildFullPath(resultFilePath);
  const expectedResult = getFileData(resultFullPath);
  const diffTree = genDiff(filepath1, filepath2, 'stylish');
  expect(diffTree).toEqual(expectedResult);
});

test('nested data test (plain format)', () => {
  const resultFilePath = '__fixtures__/result_plain.txt';
  const resultFullPath = buildFullPath(resultFilePath);
  const expectedResult = getFileData(resultFullPath);
  const diffTree = genDiff(filepath1, filepath2, 'plain');
  expect(diffTree).toEqual(expectedResult);
});
