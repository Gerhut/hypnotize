/* eslint-env mocha */

const assert = require('assert')
const { createReadStream } = require('fs')
const { resolve } = require('path')

const hypnotize = require('.')

const app = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' })
  createReadStream(resolve(__dirname, 'fixture.html')).pipe(response)
}

it('should test node server', () =>
  hypnotize(app).goto('/').title().end()
    .then(title => assert.equal(title, 'Fixture')))

it('should test node server', () =>
  hypnotize(app).goto('/').evaluate(function () {
    /* eslint-env browser */
    return document.querySelectorAll('li').length
  }).end().then(length => assert.equal(length, 4)))
