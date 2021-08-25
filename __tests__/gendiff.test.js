import { expect, test } from '@jest/globals';
import genDiff from '../src/gendiff.js';
import stylish from '../src/formatters/stylish.js';

test('nested data test', () => {
  const expectedResult = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

  const data1 = {
    common: {
      setting1: 'Value 1',
      setting2: 200,
      setting3: true,
      setting6: {
        key: 'value',
        doge: {
          wow: '',
        },
      },
    },
    group1: {
      baz: 'bas',
      foo: 'bar',
      nest: {
        key: 'value',
      },
    },
    group2: {
      abc: 12345,
      deep: {
        id: 45,
      },
    },
  };

  const data2 = {
    common: {
      follow: false,
      setting1: 'Value 1',
      setting3: null,
      setting4: 'blah blah',
      setting5: {
        key5: 'value5',
      },
      setting6: {
        key: 'value',
        ops: 'vops',
        doge: {
          wow: 'so much',
        },
      },
    },
    group1: {
      foo: 'bar',
      baz: 'bars',
      nest: 'str',
    },
    group3: {
      deep: {
        id: {
          number: 45,
        },
      },
      fee: 100500,
    },
  };

  const diffTree = genDiff(data1, data2);

  expect(stylish(diffTree)).toEqual(expectedResult);
});

test('empty data test', () => {
  const data1 = {};
  const data2 = {};
  const expectedResult = `{

}`;

  const diffTree = genDiff(data1, data2);

  expect(stylish(diffTree)).toEqual(expectedResult);
});
