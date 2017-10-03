# @invisible/chance-extras

[![CircleCI](https://circleci.com/gh/invisible-tech/chance-extras/tree/master.svg?style=svg)](https://circleci.com/gh/invisible-tech/chance-extras/tree/master)

> Chance singleton with some mixins

## Install
`yarn add @invisible/chance-extras`

## Usage

```js

const chance = require('@invisible/chance-extras')

const uniqueNumber = chance.uniqueNumberGenerator({ min: 1, max: 10 })

uniqueNumber()
uniqueNumber()
uniqueNumber({ reset: true })

```

See [mixins.spec.js](./test/specs/mixins.spec.js) for a full list of all mixins and how they are used.
