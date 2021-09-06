import * as yaml from 'js-yaml';

const mapping = {
  json: JSON.parse,
  yaml: yaml.load,
  yml: yaml.load,
};

const parse = (data, type) => {
  const fn = mapping[type];
  if (typeof fn !== 'function') {
    throw new Error(
      `This type is not supported. Please specify one of the next types: ${Object.keys(mapping).join(', ')}`,
    );
  }

  return fn(data);
};

export default parse;
