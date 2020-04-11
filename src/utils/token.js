const KEY = 'token'
export function setToken(obj) {
  obj = JSON.stringify(obj)
  window.localStorage.setItem(KEY, obj)
}
export function getToken() {
  return JSON.parse(window.localStorage.getItem(KEY))
}
export function removeToken() {
  window.localStorage.removeItem(KEY)
}
export function setLocal(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}
export function getLocal(key) {
  return JSON.parse(window.localStorage.getItem(key))
}
export function removeLocal(key) {
  window.localStorage.removeItem(key)
}
