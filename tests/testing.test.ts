import { palindrome } from '../src/utils/for_testing';

test('palindrome of a ', () => {
  const result = palindrome('a');
  expect(result).toBe('a');
});
