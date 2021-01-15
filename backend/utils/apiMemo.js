const got = require('got')

function apiMemo() {
  const cache = new Map()

  return async function (endpoint) {
    if (cache.has(endpoint)) return cache.get(endpoint)

    const { body } = await got(endpoint)

    cache.set(endpoint, body)

    return cache.get(endpoint)
  }
}

module.exports = apiMemo()
