import parse from './parse.js'

const genDiff = (filePath1, filePath2, format = '') => {
    const file1 = parse(filePath1)
    const file2 = parse(filePath2)
    return file1, file2
}

export default genDiff