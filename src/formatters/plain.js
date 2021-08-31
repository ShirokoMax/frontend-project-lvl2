import _ from 'lodash';

const stringify = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }

  return typeof value === 'string' ? `'${value}'` : value;
};

const format = (node, path = []) => {
  const propName = [...path, node.key].join('.');
  switch (node.type) {
    case 'root': {
      const items = node.children.flatMap((child) => format(child));
      return `${items.join('\n')}`;
    }

    case 'added':
      return `Property '${propName}' was added with value: ${stringify(node.value)}`;

    case 'deleted':
      return `Property '${propName}' was removed`;

    case 'nested': {
      const items = node.children
        .filter((child) => child.type !== 'unchanged')
        .flatMap((child) => `${format(child, [...path, node.key])}`);
      return `${items.join('\n')}`;
    }

    case 'changed': {
      return `Property '${propName}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`;
    }

    case 'unchanged': {
      return '';
    }

    default:
      throw new Error(`There is no handler for this node type: '${node.type}'`);
  }
};

const plain = (tree) => format(tree);

export default plain;
