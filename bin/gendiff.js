#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import * as process from 'process';
import { Command } from 'commander';
import genDiff from '../src/gendiff.js';

const program = new Command();

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
