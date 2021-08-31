import * as yaml from 'js-yaml';

const mapping = {
  json: JSON.parse,
  yaml: yaml.load,
  yml: yaml.load,
};

const parse = (data, ext) => {
  const fn = mapping[ext];
  if (typeof fn !== 'function') {
    throw new Error(
      `This extension is not supported. Please specify a file with one of the extensions: ${Object.keys(mapping).join(', ')}`,
    );
  }

  return fn(data);
};

export default parse;
