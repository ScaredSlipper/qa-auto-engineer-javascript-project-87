import fs from 'node:fs'
import { load } from 'js-yaml'

const parseJson = (readFile) => JSON.parse(readFile)

const parseYml = (readFile) => load(readFile)

const parse = (filePath) => {
    const readFile = fs.readFileSync(filePath, 'utf-8')
    const extension = filePath.split('.').at(-1)
    const parsedFile = extension.toLowerCase() === 'json' ? parseJson(readFile) : parseYml(readFile)
    return parsedFile
}

export default parse