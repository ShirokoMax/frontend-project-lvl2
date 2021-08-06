#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import * as process from 'process';
import { Command } from 'commander';
import _ from 'lodash';

const program = new Command();

const genDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);

  const uniqKeys = _.uniq([...keys1, ...keys2]);
  const sortedKeys = _.sortBy(uniqKeys);

  const diff = sortedKeys.map((key) => {
    let str;
    if (_.has(data1, key) && _.has(data2, key)) {
      if (data1[key] !== data2[key]) {
        str = `  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}\n`;
      } else {
        str = `    ${key}: ${data1[key]}\n`;
      }
    } else if (_.has(data1, key) && !_.has(data2, key)) {
      str = `  - ${key}: ${data1[key]}\n`;
    } else if (!_.has(data1, key) && _.has(data2, key)) {
      str = `  + ${key}: ${data2[key]}\n`;
    }
    return str;
  });

  return ['{\n', ...diff, '}'].join('');
};

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const workDirPath = process.cwd();

    const path1 = path.resolve(workDirPath, '__fixtures__', filepath1);
    const path2 = path.resolve(workDirPath, '__fixtures__', filepath2);

    let data1;
    let data2;
    if (path.extname(path1) === '.json') {
      data1 = JSON.parse(fs.readFileSync(path1, 'utf8'));
    }
    if (path.extname(path2) === '.json') {
      data2 = JSON.parse(fs.readFileSync(path2, 'utf8'));
    }

    console.log(genDiff(data1, data2));
  });

program.parse();
