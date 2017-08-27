# Hypnotize

[![Build Status](https://travis-ci.org/Gerhut/hypnotize.svg?branch=master)](https://travis-ci.org/Gerhut/hypnotize)
[![Coverage Status](https://coveralls.io/repos/github/Gerhut/hypnotize/badge.svg?branch=master)](https://coveralls.io/github/Gerhut/hypnotize?branch=master)
[![dependencies Status](https://david-dm.org/Gerhut/hypnotize/status.svg)](https://david-dm.org/Gerhut/hypnotize)
[![devDependencies Status](https://david-dm.org/Gerhut/hypnotize/dev-status.svg)](https://david-dm.org/Gerhut/hypnotize?type=dev)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

![Hypno](https://elite-four.github.io/pokemon-sprites/97.png)

E2E test node server using [nightmare][].

## Install

    $ npm install --save-dev hypnotize

## Usage

```JavaScript
const assert = require('assert')
const hypnotize = require('hypnotize')
const express = require('express')

const app = express()

app.get('/info', function (req, res) {
  res.send('<p>Info</p>')
})

hypnotize(app)
  .goto('/info')
  .evaluate(function () {
    return document.querySelector('p').innerText
  })
  .end()
  .then(function (text) {
    assert.equal(text, 'Info')
  })
```

## License

MIT

[nightmare]: https://github.com/segmentio/nightmare
