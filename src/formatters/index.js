import stylish from './stylish.js';
import plain from './plain.js';

const mapping = {
  stylish,
  plain,
  json: JSON.stringify,
};

const formatting = (tree, format) => {
  const fn = mapping[format];
  if (typeof fn !== 'function') {
    throw new Error(
      `This formatter is not supported. Please specify correct output format: ${Object.keys(mapping).join(', ')}`,
    );
  }

  return fn(tree);
};

export default formatting;
