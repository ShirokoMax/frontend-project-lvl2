import stylish from './stylish.js';

const mapping = {
  stylish,
};

const formatter = (tree, format) => {
  const fn = mapping[format];
  if (typeof fn !== 'function') {
    throw new Error(
      `This formatter is not supported. Please specify correct output format: ${Object.keys(mapping).join(', ')}`,
    );
  }

  return fn(tree);
};

export default formatter;
