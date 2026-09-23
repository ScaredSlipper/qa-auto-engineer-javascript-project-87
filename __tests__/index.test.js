import diff from '../src/index.js'

test('deep equality', () => {
  const a = { a: [1, 2] }
  const b = { a: [1, 2] }
  const c = { a: [2, 1] }
  const diffB = diff(a, b)[0].type
  const diffC = diff(a, c)[0].type
  expect(diffB).toEqual('unchanged')
  expect(diffC).toEqual('changed')
})
