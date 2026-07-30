import fs from 'fs'

const parse = (filePath) => {
    const readFile = fs.readFileSync(filePath, 'utf-8')
    const parcedFile = JSON.parse(readFile)
    return parcedFile
}

export default parse