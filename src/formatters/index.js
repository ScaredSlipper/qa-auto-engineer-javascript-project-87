import stylish from './stylish.js'
import plain from './plain.js'
import json from './json.js'

class Output {
  constructor(diff) {
    this.diff = diff
  }

  stylish() {
    return stylish(this.diff)
  }

  plain() {
    return plain(this.diff)
  }

   json() {
    return json(this.diff)
  }
}

export default Output