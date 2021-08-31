import * as path from 'path';
import * as process from 'process';
import * as fs from 'fs';
import buildTree from './buildtree.js';
import parse from './parser.js';
import formatting from './formatters/index.js';

const buildFullPath = (filepath) => {
  const workDirPath = process.cwd();
  return path.resolve(workDirPath, filepath);
};

const getFileData = (filepath) => fs.readFileSync(filepath, 'utf8');

const getFileExt = (filepath) => {
  const extname = path.extname(filepath);
  return extname.replace('.', '');
};

const genDiff = (filepath1, filepath2, format) => {
  const fullPath1 = buildFullPath(filepath1);
  const fullPath2 = buildFullPath(filepath2);

  const data1 = getFileData(fullPath1);
  const data2 = getFileData(fullPath2);

  const ext1 = getFileExt(fullPath1);
  const ext2 = getFileExt(fullPath2);

  const tree1 = parse(data1, ext1);
  const tree2 = parse(data2, ext2);

  const diffTree = buildTree(tree1, tree2);
  return formatting(diffTree, format);
};

export default genDiff;
