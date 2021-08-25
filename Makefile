install:
	npm install

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

gendiff-test:
	gendiff __fixtures__/file1.yml __fixtures__/file2.yml

.PHONY: test