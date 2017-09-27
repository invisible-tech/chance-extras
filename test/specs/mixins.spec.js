'use strict'

const avow = require('avow')
const {
  includes,
  intersection,
  negate,
  startsWith,
} = require('lodash/fp')

const chance = require('../../src')

describe('chanceMixins', () => {
  describe('uniqueWordGenerator', () => {
    it('should always return unique words', () => {
      const uniqueWord = chance.uniqueWordGenerator(1)
      const cache = []
      for (let i = 0; i <= 15; i++) {
        const word = uniqueWord()
        avow(! (includes(word, cache)), 'outputted non-unique word')
        cache.push(word)
      }
    })

    it('should allow reset of cache', () => {
      const uniqueWord = chance.uniqueWordGenerator(1)
      const cache = []
      for (let i = 0; i <= 15; i++) {
        const word = uniqueWord()
        avow(! (includes(word, cache)), 'outputted non-unique word')
        cache.push(word)
      }

      const cache2 = []
      uniqueWord({ reset: true })
      for (let i = 0; i <= 15; i++) {
        const word = uniqueWord()
        avow(! (includes(word, cache2)), 'outputted non-unique word')
        cache2.push(word)
      }

      avow(intersection(cache)(cache2).length > 0)
    })
  })

  describe('uniqueNumberGenerator', () => {
    it('should always return unique number', () => {
      const uniqueNumber = chance.uniqueNumberGenerator({ min: 1, max: 10 })
      const cache = []
      for (let i = 0; i <= 9; i++) {
        const number = uniqueNumber()
        avow(! (includes(number, cache)), 'outputted non-unique number')
        cache.push(number)
      }
    })

    it('should allow reset of cache', () => {
      const uniqueNumber = chance.uniqueNumberGenerator({ min: 1, max: 10 })
      const cache = []
      for (let i = 0; i <= 8; i++) {
        const number = uniqueNumber()
        avow(! (includes(number, cache)), 'outputted non-unique number')
        cache.push(number)
      }

      const cache2 = []
      uniqueNumber({ reset: true })
      for (let i = 0; i <= 8; i++) {
        const number = uniqueNumber()
        avow(! (includes(number, cache2)), 'outputted non-unique number')
        cache2.push(number)
      }

      avow(intersection(cache)(cache2).length > 0)
    })
  })

  describe('other mixins', () => {
    const isNumeric = negate(isNaN)
    const isAlphaNumeric = text => {
      const alphaNumeric = /^[0-9a-zA-Z]+$/
      return Boolean(text.match(alphaNumeric))
    }

    const isUpperAlphaNumeric = text => {
      const upperAlphaNumeric = /^[0-9A-Z]+$/
      return Boolean(text.match(upperAlphaNumeric))
    }

    it('alphaNumeric', async () => {
      const alphaNumeric = chance.alphaNumeric(12)
      avow.strictEqual(alphaNumeric.length, 12)
      avow(isAlphaNumeric(alphaNumeric))
      avow(isAlphaNumeric(chance.alphaNumeric()))
    })

    it('numeric', async () => {
      const numeric = chance.numeric(12)
      avow.strictEqual(numeric.length, 12)
      avow(isNumeric(numeric))
      avow(isNumeric(chance.numeric()))
    })

    it('slackChannelId', () => {
      const slackChannelId = chance.slackChannelId()
      avow(startsWith('C')(slackChannelId))
      avow.strictEqual(slackChannelId.length, 9)
    })

    it('slackUserId', () => {
      const slackUserId = chance.slackUserId()
      avow(startsWith('U')(slackUserId))
      avow.strictEqual(slackUserId.length, 9)
    })

    it('slackGroupId', () => {
      const slackGroupId = chance.slackGroupId()
      avow(startsWith('G')(slackGroupId))
      avow.strictEqual(slackGroupId.length, 9)
    })

    it('slackChannelName', () => {
      const slackChannelName = chance.slackChannelName()
      avow(slackChannelName.length, 21)
    })

    it('slackFileId', () => {
      const slackFileId = chance.slackFileId()
      avow(startsWith('F')(slackFileId))
      avow.strictEqual(slackFileId.length, 9)
    })

    it('slackTeamId', () => {
      const slackTeamId = chance.slackTeamId()
      avow(startsWith('T')(slackTeamId))
      avow.strictEqual(slackTeamId.length, 9)
    })

    it('slackTs', () => {
      const slackTs = chance.slackTs()
      const pieces = slackTs.split('.')
      avow.strictEqual(pieces.length, 2)
      avow(isNumeric(pieces[0]))
      avow(isNumeric(pieces[1]))
    })

    it('slackBotToken', () => {
      const slackBotToken = chance.slackBotToken()
      const pieces = slackBotToken.split('-')
      avow.strictEqual(pieces.length, 3)
      avow.strictEqual(pieces[0], 'xoxb')
      avow(isNumeric(pieces[1]))
      avow.strictEqual(pieces[1].length, 11)
      avow(isAlphaNumeric(pieces[2]))
      avow.strictEqual(pieces[2].length, 24)
    })

    it('slackOauthToken', () => {
      const slackOauthToken = chance.slackOauthToken()
      const pieces = slackOauthToken.split('-')
      avow.strictEqual(pieces.length, 5)
      avow.strictEqual(pieces[0], 'xoxb')
      avow(isNumeric(pieces[1]))
      avow.strictEqual(pieces[1].length, 11)
      avow(isNumeric(pieces[2]))
      avow.strictEqual(pieces[2].length, 11)
      avow(isNumeric(pieces[3]))
      avow.strictEqual(pieces[3].length, 12)
      avow(isAlphaNumeric(pieces[4]))
      avow.strictEqual(pieces[4].length, 32)
    })

    it('upperAlphaNumeric', async () => {
      const upperAlphaNumeric = chance.upperAlphaNumeric(12)
      avow.strictEqual(upperAlphaNumeric.length, 12)
      avow(isUpperAlphaNumeric(upperAlphaNumeric))
    })
  })
})
