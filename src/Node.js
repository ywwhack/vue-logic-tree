import { create, select } from './util'

export default class Node {
  constructor (_node) {
    this._node = _node
  }

  validValue (value) {
    return value || value === 0
  }

  attr (name, value) {
    if (this.validValue(value)) {
      this._node.setAttribute(name, value)
      return this
    } else {
      return this._node.getAttribute(name)
    }
  }

  style (name, value) {
    if (this.validValue(value)) {
      this._node.style[name] = value
      return this
    } else {
      return this._node.style[name]
    }
  }

  text (value) {
    this._node.innerHTML = value
    return this
  }

  select (selector) {
    return select(selector, this._node)
  }

  append (selector) {
    const _childNode = create(selector)
    this._node.appendChild(_childNode)
    return new Node(_childNode)
  }

  insert (selector, _nodeBefore) {
    const _insertedNode = create(selector)
    _nodeBefore = typeof _nodeBefore === 'string' ? this.select(_nodeBefore, this._node)._node : _nodeBefore
    this._node.insertBefore(_insertedNode, _nodeBefore)
    return new Node(_insertedNode)
  }

  empty () {
    return !this._node
  }
}
