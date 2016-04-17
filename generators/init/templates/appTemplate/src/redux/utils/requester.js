import 'fetch-ie8'

function setNewToken (response) {
  const token = response.headers.get('AccessToken')
  if (token) {
    sessionStorage.accessToken = token
  }
  return response
}
function toJson (response) {
  return response.json()
}
function RequestError (status) {
  this.message = 'Server reject this request'
  this.status = status
}
function checkError (json) {
  if (json) {
    if (json.Status === undefined) {
      throw new Error('No [Status] filed found in response data')
    } else if (json.Status === 0) {
      return json
    } else {
      throw new RequestError(json.Status)
    }
  } else {
    throw new Error('Response data is null')
  }
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
  if (sessionStorage.accessToken) {
    options.headers['AccessToken'] = sessionStorage.accessToken
  }
  return fetch(url, options)
        .then(setNewToken)
        .then(toJson)
        .then(checkError)
}

export default {
  get (url) { return baseRequest(url, 'get') },
  post (url, data) { return baseRequest(url, 'post', data) },
  put (url, data) { return baseRequest(url, 'put', data) },
  delete (url, data) { return baseRequest(url, 'delete', data) }
}
