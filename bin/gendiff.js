#!/usr/bin/env node

import * as path from 'path';
import * as process from 'process';
import { Command } from 'commander';
import genDiff from '../src/gendiff.js';
import parser from '../src/parsers.js';

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

    const data1 = parser(path1);
    const data2 = parser(path2);

    console.log(genDiff(data1, data2));
  });

program.parse();
