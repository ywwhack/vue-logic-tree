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
