/* eslint-env mocha */

var assert = require('assert')
var createReadStream = require('fs').createReadStream
var resolve = require('path').resolve

var hypnotize = require('..')

function app (request, response) {
  response.writeHead(200, { 'Content-Type': 'text/html' })
  createReadStream(resolve(__dirname, 'fixture.html')).pipe(response)
}

it('should test node server', function () {
  return hypnotize(app)
    .goto('/')
    .title()
    .end()
    .then(function (title) {
      assert.equal(title, 'Fixture')
    })
})

it('should test node server', function () {
  return hypnotize(app)
    .goto('/')
    .evaluate(function () {
      /* eslint-env browser */
      return document.querySelectorAll('li').length
    })
    .end()
    .then(function (length) {
      assert.equal(length, 4)
    })
})
