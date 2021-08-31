#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/gendiff.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0')
  .option('-f, --format [type]', 'output format (default: "stylish")', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const { format } = program.opts();
    console.log(genDiff(filepath1, filepath2, format));
  });

program.parse();
