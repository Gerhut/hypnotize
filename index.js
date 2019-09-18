var createServer = require('http').createServer
const URL = require('url').URL

var Nightmare = require('nightmare')

function getServerURL (server, path) {
  var port = server.address().port
  var urlObject = new URL(path, `http://127.0.0.1:${port}`)
  return urlObject
}

// function before (func, before) {
//   return function () {
//     var args = Array.prototype.slice.call(arguments)
//     before.call(this, args)
//     return func.apply(this, args)
//   }
// }

function watchArgs (func, watcher) {
  return function () {
    var args = Array.prototype.slice.call(arguments)
    watcher(args)
    return func.apply(this, args)
  }
}

function hypnotize (app, options) {
  var nightmare = Nightmare(options)
  var server = createServer(app)
  nightmare.queue(function (callback) {
    nightmare.child.call = watchArgs(nightmare.child.call,
      function (args) {
        if (args[0] === 'goto') {
          args[1] = getServerURL(server, args[1])
        } else if (args[0] === 'quit') {
          server.close()
        }
      })
    server.listen(callback)
  })
  return nightmare
}

module.exports = hypnotize
