install:
	npm ci
	sudo npm link

gendiff:
	node ./bin/gendiff.js

test:
	NODE_OPTIONS=--experimental-vm-modules npx jest

test-c:
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage

lint:
	npx eslint