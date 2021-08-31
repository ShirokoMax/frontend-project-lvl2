import _ from 'lodash';

const createIndent = (depth, spaces = 4) => ' '.repeat(depth * spaces);

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return String(value);
  }

  const indent = createIndent(depth);
  const quoteDepth = 0.5;
  const quoteIndent = createIndent(depth - quoteDepth);
  const items = Object.keys(value).map((key) => `${indent}  ${key}: ${stringify(value[key], depth + 1)}`);

  return `{\n${items.join('\n')}\n${quoteIndent}}`;
};

const format = (node, depth) => {
  const indent = createIndent(depth);
  switch (node.type) {
    case 'root': {
      const rootDepth = 0.5;
      const items = node.children.flatMap((child) => format(child, depth + rootDepth));
      return `{\n${items.join('\n')}\n}`;
    }

    case 'added':
      return `${indent}+ ${node.key}: ${stringify(node.value, depth + 1)}`;

    case 'deleted':
      return `${indent}- ${node.key}: ${stringify(node.value, depth + 1)}`;

    case 'nested': {
      const nestedItems = node.children.flatMap((child) => format(child, depth + 1));
      const quoteDepth = 0.5;
      const quoteIndent = createIndent(depth + quoteDepth);
      return `${indent}  ${node.key}: {\n${nestedItems.join('\n')}\n${quoteIndent}}`;
    }

    case 'changed': {
      const oldValue = `${indent}- ${node.key}: ${stringify(node.oldValue, depth + 1)}`;
      const newValue = `${indent}+ ${node.key}: ${stringify(node.newValue, depth + 1)}`;
      return [oldValue, newValue];
    }

    case 'unchanged':
      return `${indent}  ${node.key}: ${stringify(node.value, depth + 1)}`;

    default:
      throw new Error(`There is no handler for this node type: '${node.type}'`);
  }
};

const stylish = (tree) => format(tree, 0);

export default stylish;
