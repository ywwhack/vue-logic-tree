import Node from './Node'

export function select (selector, parent = document) {
  const _node = typeof selector === 'string' ? parent.querySelector(selector) : selector
  return new Node(_node)
}

export function create (selector) {
  return document.createElementNS('http://www.w3.org/2000/svg', selector)
}

export function clone (obj) {
  return JSON.parse(JSON.stringify(obj))
}

export function merge (obj1, obj2) {
  for (let prop in obj2) {
    const value1 = obj1[prop]
    const value2 = obj2[prop]
    if (typeof value2 === 'object') {
      if (typeof value1 === 'object') {
        merge(obj1[prop], obj2[prop])
      } else {
        obj1[prop] = clone(obj2[prop])
      }
    } else {
      obj1[prop] = obj2[prop]
    }
  }
}

export function traverse (root, fn) {
  fn(root)
  if (root.rules) {
    root.rules.forEach(rule => traverse(rule, fn))
  }
}

export function isEmpty (obj) {
  return Object.keys(obj).length === 0
}
