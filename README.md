# comiru interview code

the code for comiru's interview

## Introduce

* Write with ECMAScript 5
* [Webpack](https://webpack.js.org/) for code bundle
* [JSHint](https://jshint.com/) for code quality
* [Jest](https://jestjs.io/) for code test

## Setup

```shell
git clone https://github.com/billyct/comiru_interview_code
cd ./comiru_interview_code
yarn
yarn build
```

### Run Tests

```shell
yarn test
```

### Run Example

```shell
php -S localhost:8000
```

*before you run the examples, you should run `yarn build` to build the code first*

now you can visit

* [auto-complete tag widget](http://localhost:8000/example/autocomplete.html)
* [image-lazyLoad component](http://localhost:8000/example/lazy.html)
* [News articles List](http://localhost:8000/example/news.html)


## Directory Structure

```
├── src
│   ├── autocomplete // the AutoComplete Component
│   ├── common  // some common util functions
│   ├── lazy // the Lazy Component for image-lazyLoad
│   └── news // the News articles List Component
├── example // example code in there, you can run the html files with `file:///`
│   ├── autocomplete.html // AutoComplete library example
│   ├── faker.min.js  // generate the faker data you can find it here: https://github.com/marak/faker.js
│   ├── lazy.html // Lazy library example
│   └── news.html // the News articles List
└── dist // when you run `yarn build` it will appear
```

## Link The Components

* [AutoComplete Component](./src/autocomplete)
* [Lazy Component](./src/lazy)
* [News Component](./src/news)


