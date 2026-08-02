import fs from 'node:fs'
import { extname } from 'node:path'
import { load } from 'js-yaml'

const parseJson = (readFile) => JSON.parse(readFile)

const parseYml = (readFile) => load(readFile)

const isExtentionSupported = (extention) => {
    const supportedExtentions = ['.json', '.yml', '.yaml']
    return supportedExtentions.includes(extention)
}

const parse = (filePath) => {
    try {
    const readFile = fs.readFileSync(filePath, 'utf-8')
    const extension = extname(filePath).toLowerCase()
    const extensionIsSupported = isExtentionSupported(extension)
    if (extensionIsSupported) {
        const parsedFile = extension === '.json' ? parseJson(readFile) : parseYml(readFile)
        return parsedFile
    }
    }
    catch {
        throw new Error('file not found or unable to read file')
    }
    throw new Error('unsupported file format')
}

export default parse