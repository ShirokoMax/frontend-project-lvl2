#!/usr/bin/env node

import * as path from 'path';
import * as process from 'process';
import * as fs from 'fs';
import { Command } from 'commander';
import genDiff from '../src/gendiff.js';
import parser from '../src/parsers.js';
import formatter from '../src/formatters/index.js';

const buildFullPath = (filepath) => {
  const workDirPath = process.cwd();
  return path.resolve(workDirPath, filepath);
};

const getFileData = (filepath) => fs.readFileSync(filepath, 'utf8');

const getFileExt = (filepath) => {
  const extname = path.extname(filepath);
  return extname.replace('.', '');
};

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0')
  .option('-f, --format [type]', 'output format (default: "stylish")', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const fullPath1 = buildFullPath(filepath1);
    const fullPath2 = buildFullPath(filepath2);

    const data1 = getFileData(fullPath1);
    const data2 = getFileData(fullPath2);

    const ext1 = getFileExt(fullPath1);
    const ext2 = getFileExt(fullPath2);

    const tree1 = parser(data1, ext1);
    const tree2 = parser(data2, ext2);

    const diffTree = genDiff(tree1, tree2);

    const { format } = program.opts();
    console.log(formatter(diffTree, format));
  });

program.parse();
