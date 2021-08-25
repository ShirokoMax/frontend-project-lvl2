import _ from 'lodash';

const buildTree = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);

  const uniqKeys = _.uniq([...keys1, ...keys2]);
  const sortedKeys = _.sortBy(uniqKeys);

  return sortedKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (!_.has(data1, key)) {
      return {
        type: 'added',
        key,
        value: value2,
      };
    } if (!_.has(data2, key)) {
      return {
        type: 'deleted',
        key,
        value: value1,
      };
    }

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return {
        type: 'nested',
        key,
        children: buildTree(value1, value2),
      };
    }

    if (value1 !== value2) {
      return {
        type: 'changed',
        key,
        oldValue: value1,
        newValue: value2,
      };
    }
    return {
      type: 'unchanged',
      key,
      value: value1,
    };
  });
};

const genDiff = (data1, data2) => ({
  type: 'root',
  children: buildTree(data1, data2),
});

export default genDiff;
