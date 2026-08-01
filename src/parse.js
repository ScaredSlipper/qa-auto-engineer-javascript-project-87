import fs from 'node:fs'
import { extname } from 'node:path'
import { load } from 'js-yaml'

const parseJson = (readFile) => JSON.parse(readFile)

const parseYml = (readFile) => load(readFile)

const parse = (filePath) => {
    const readFile = fs.readFileSync(filePath, 'utf-8')
    const extension = extname(filePath).toLowerCase()
    if (extension === '.json' || extension === '.yml' || extension === '.yaml') {
        const parsedFile = extension === '.json' ? parseJson(readFile) : parseYml(readFile)
        return parsedFile
    }
    return 'unsupported file format'
}

export default parse