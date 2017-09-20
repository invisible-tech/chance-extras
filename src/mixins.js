'use strict'

const {
  includes,
  join,
} = require('lodash/fp')

// We use dependency injection here to decorate the chance object passed in
const mixins = chance => {
  /**
   * Generates a random word of a given length that is guaranteed to be unique
   * @param {Number} length the length of the returned word
   * @return {String} the random unique string
   */
  const uniqueWordGenerator = (length = 10) => {
    let cache = []
    return ({ reset = false } = {}) => {
      if (reset) cache = []
      const word = chance.unique(chance.word, 1, {
        comparator: (err, val) => includes(val)(cache),
        length,
      }).pop()
      cache.push(word)
      return word
    }
  }

  const uniqueWord = uniqueWordGenerator()
  const uniqueThreeLetterWord = uniqueWordGenerator(3)

  /**
   * Generates a random number that is guaranteed to be unique
   * @param {Number} min The minimum of the range
   * @param {Number} max The maximum of the range
   * @return {Number} The random unique number
   */
  const uniqueNumberGenerator = ({ min = 1, max = Infinity } = {}) => {
    let cache = []
    return ({ reset = false } = {}) => {
      if (reset) cache = []
      const number = chance.unique(chance.natural, 1, {
        comparator: (err, val) => includes(val)(cache),
        max,
        min,
      }).pop()
      cache.push(number)
      return number
    }
  }

  const uniqueNumber = uniqueNumberGenerator()

  const alphaNumChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const numChars = '0123456789'

  const numeric = (length = 8) => chance.string({ length, pool: numChars })
  const alphaNumeric = (length = 8) => chance.string({ length, pool: alphaNumChars })
  const upperAlphaNumeric = (length = 8) => alphaNumeric(length).toUpperCase()

  const slackChannelId = () => `C${upperAlphaNumeric()}`
  const slackChannelName = () => alphaNumeric(21)
  const slackGroupId = () => `G${upperAlphaNumeric()}`
  const slackFileId = () => `F${upperAlphaNumeric()}`
  const slackTeamId = () => `T${upperAlphaNumeric()}`
  const slackUserId = () => `U${upperAlphaNumeric()}`
  const slackTs = () => `${chance.natural()}.${chance.natural()}`
  const slackBotToken = () => join('-')([
    'xoxb',
    numeric(11),
    alphaNumeric(24),
  ])
  const slackOauthToken = () => join('-')([
    'xoxb',
    numeric(11),
    numeric(11),
    numeric(12),
    alphaNumeric(32),
  ])

  chance.mixin({
    alphaNumeric,
    numeric,
    slackBotToken,
    slackChannelId,
    slackChannelName,
    slackFileId,
    slackGroupId,
    slackOauthToken,
    slackTeamId,
    slackTs,
    slackUserId,
    uniqueNumber,
    uniqueNumberGenerator,
    uniqueThreeLetterWord,
    uniqueWord,
    uniqueWordGenerator,
    upperAlphaNumeric,
  })

  return chance
}

module.exports = mixins
