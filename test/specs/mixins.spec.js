'use strict'

const assert = require('assert')
const {
  includes,
  intersection,
  isNaN,
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
        assert(! (includes(word, cache)), 'outputted non-unique word')
        cache.push(word)
      }
    })

    it('should allow reset of cache', () => {
      const uniqueWord = chance.uniqueWordGenerator(1)
      const cache = []
      for (let i = 0; i <= 15; i++) {
        const word = uniqueWord()
        assert(! (includes(word, cache)), 'outputted non-unique word')
        cache.push(word)
      }

      const cache2 = []
      uniqueWord({ reset: true })
      for (let i = 0; i <= 15; i++) {
        const word = uniqueWord()
        assert(! (includes(word, cache2)), 'outputted non-unique word')
        cache2.push(word)
      }

      assert(intersection(cache)(cache2).length > 0)
    })
  })

  describe('uniqueNumberGenerator', () => {
    it('should always return unique number', () => {
      const uniqueNumber = chance.uniqueNumberGenerator({ min: 1, max: 10 })
      const cache = []
      for (let i = 0; i <= 9; i++) {
        const number = uniqueNumber()
        assert(! (includes(number, cache)), 'outputted non-unique number')
        cache.push(number)
      }
    })

    it('should allow reset of cache', () => {
      const uniqueNumber = chance.uniqueNumberGenerator({ min: 1, max: 10 })
      const cache = []
      for (let i = 0; i <= 8; i++) {
        const number = uniqueNumber()
        assert(! (includes(number, cache)), 'outputted non-unique number')
        cache.push(number)
      }

      const cache2 = []
      uniqueNumber({ reset: true })
      for (let i = 0; i <= 8; i++) {
        const number = uniqueNumber()
        assert(! (includes(number, cache2)), 'outputted non-unique number')
        cache2.push(number)
      }

      assert(intersection(cache)(cache2).length > 0)
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
      assert.strictEqual(alphaNumeric.length, 12)
      assert(isAlphaNumeric(alphaNumeric))
      assert(isAlphaNumeric(chance.alphaNumeric()))
    })

    it('numeric', async () => {
      const numeric = chance.numeric(12)
      assert.strictEqual(numeric.length, 12)
      assert(isNumeric(numeric))
      assert(isNumeric(chance.numeric()))
    })

    it('slackChannelId', () => {
      const slackChannelId = chance.slackChannelId()
      assert(startsWith('C')(slackChannelId))
      assert.strictEqual(slackChannelId.length, 9)
    })

    it('slackUserId', () => {
      const slackUserId = chance.slackUserId()
      assert(startsWith('U')(slackUserId))
      assert.strictEqual(slackUserId.length, 9)
    })

    it('slackGroupId', () => {
      const slackGroupId = chance.slackGroupId()
      assert(startsWith('G')(slackGroupId))
      assert.strictEqual(slackGroupId.length, 9)
    })

    it('slackChannelName', () => {
      const slackChannelName = chance.slackChannelName()
      assert(slackChannelName.length, 21)
    })

    it('slackFileId', () => {
      const slackFileId = chance.slackFileId()
      assert(startsWith('F')(slackFileId))
      assert.strictEqual(slackFileId.length, 9)
    })

    it('slackTeamId', () => {
      const slackTeamId = chance.slackTeamId()
      assert(startsWith('T')(slackTeamId))
      assert.strictEqual(slackTeamId.length, 9)
    })

    it('slackTs', () => {
      const slackTs = chance.slackTs()
      const pieces = slackTs.split('.')
      assert.strictEqual(pieces.length, 2)
      assert(isNumeric(pieces[0]))
      assert(isNumeric(pieces[1]))
    })

    it('slackBotToken', () => {
      const slackBotToken = chance.slackBotToken()
      const pieces = slackBotToken.split('-')
      assert.strictEqual(pieces.length, 3)
      assert.strictEqual(pieces[0], 'xoxb')
      assert(isNumeric(pieces[1]))
      assert.strictEqual(pieces[1].length, 11)
      assert(isAlphaNumeric(pieces[2]))
      assert.strictEqual(pieces[2].length, 24)
    })

    it('slackOauthToken', () => {
      const slackOauthToken = chance.slackOauthToken()
      const pieces = slackOauthToken.split('-')
      assert.strictEqual(pieces.length, 5)
      assert.strictEqual(pieces[0], 'xoxb')
      assert(isNumeric(pieces[1]))
      assert.strictEqual(pieces[1].length, 11)
      assert(isNumeric(pieces[2]))
      assert.strictEqual(pieces[2].length, 11)
      assert(isNumeric(pieces[3]))
      assert.strictEqual(pieces[3].length, 12)
      assert(isAlphaNumeric(pieces[4]))
      assert.strictEqual(pieces[4].length, 32)
    })

    it('upperAlphaNumeric', async () => {
      const upperAlphaNumeric = chance.upperAlphaNumeric(12)
      assert.strictEqual(upperAlphaNumeric.length, 12)
      assert(isUpperAlphaNumeric(upperAlphaNumeric))
    })
  })
})
