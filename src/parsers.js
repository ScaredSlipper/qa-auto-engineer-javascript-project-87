import { load } from 'js-yaml'

const parsers = {
  '.json': readFile => JSON.parse(readFile),
  '.yml': readFile => load(readFile),
  '.yaml': readFile => load(readFile),
}

export default parsers
