'use strict'

const Chance = require('chance')
const mixins = require('./mixins')

const chance = mixins(new Chance())

module.exports = chance
