import _ from 'lodash';

const genDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);

  const uniqKeys = _.uniq([...keys1, ...keys2]);
  const sortedKeys = _.sortBy(uniqKeys);

  const diff = sortedKeys.map((key) => {
    let str;
    if (_.has(data1, key) && _.has(data2, key)) {
      if (data1[key] !== data2[key]) {
        str = `  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}\n`;
      } else {
        str = `    ${key}: ${data1[key]}\n`;
      }
    } else if (_.has(data1, key) && !_.has(data2, key)) {
      str = `  - ${key}: ${data1[key]}\n`;
    } else if (!_.has(data1, key) && _.has(data2, key)) {
      str = `  + ${key}: ${data2[key]}\n`;
    }
    return str;
  });

  return ['{\n', ...diff, '}'].join('');
};

export default genDiff;
