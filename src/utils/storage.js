export function setItem (key, value) {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

export function getItem (key) {
  return window.localStorage.getItem(key) ? JSON.parse(window.localStorage.getItem(key)) : null
}

export function removeItem (key) {
  window.localStorage.removeItem(key)
}
