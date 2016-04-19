import 'fetch-ie8'

function toJson (response) {
  return response.json()
}

function baseRequest (url, method, data = null) {
  let options = {
    method: method.toLowerCase()
  }

  if (options.method !== 'get' && data) {
    options.body = JSON.stringify(data)
  }

  options.headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
  return fetch(url, options)
        .then(toJson)
}

export default {
  get (url) { return baseRequest(url, 'get') },
  post (url, data) { return baseRequest(url, 'post', data) },
  put (url, data) { return baseRequest(url, 'put', data) },
  delete (url, data) { return baseRequest(url, 'delete', data) }
}
