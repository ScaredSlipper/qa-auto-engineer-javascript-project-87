import { program } from 'commander'

program
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.')

program.parse()

const genDiff = (file1, file2) => {
    return null
}

export default genDiff