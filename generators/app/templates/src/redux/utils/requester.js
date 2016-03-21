import * as $ from 'jquery'

function checkHttpStatus (...args) {
  let d = $.Deferred()
  const xhr = args[2]
  const data = args[0]
  if (xhr.status >= 400) {
    d.reject(xhr.statusText)
  } else if (!data.success) {
    d.reject(data.message)
  } else {
    d.resolve(xhr)
  }
  return d.promise()
}
function setNewToken (xhr) {
  const data = xhr.responseJSON.data || { token: '' }
  const token = xhr.getResponseHeader('x-access-token') || data.token
  if (token) {
    sessionStorage.accessToken = token
  }
  return xhr
}
function baseRequest (url, method, data = null) {
  let options = {
    url: url,
    type: method.toUpperCase()
  }

  if (options.type !== 'GET') {
    options.data = JSON.stringify(data)
  }

  options.headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
  if (sessionStorage.accessToken) {
    options.headers['x-access-token'] = sessionStorage.accessToken
  }

  return $.ajax(options)
          .then(checkHttpStatus)
          .then(setNewToken)
}

export default {
  get (url) { return baseRequest(url, 'get') },
  post (url, data) { return baseRequest(url, 'post', data) },
  put (url, data) { return baseRequest(url, 'put', data) },
  delete (url, data) { return baseRequest(url, 'delete', data) }
}
