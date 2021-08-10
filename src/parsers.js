import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

const parser = (filepath) => {
  let data;
  const extname = path.extname(filepath);
  if (extname === '.json') {
    data = JSON.parse(fs.readFileSync(filepath, 'utf8'));
  } else if (extname === '.yml' || extname === '.yaml') {
    data = yaml.load(fs.readFileSync(filepath, 'utf8'));
  }
  return data;
};

export default parser;
