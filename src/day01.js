"use strict";

const loop = (arr) => function* () {
  let i = 0;
  while (true) {
    yield [arr[i % arr.length], i];
    i++;
  }
};

module.exports = (input) => {
  const tokens = input
    .trim()
    .split('\n')
    .map(str => Number.parseInt(str, 10));

  const pt1 = () => tokens.reduce((a, b) => a + b, 0);
  const pt2 = () => {
    const unique = new Set();
    let sum = 0;
    for (let [n, i] of loop(tokens)()) {
      sum += n;
      if (unique.has(sum)) return `iterations: ${i} / occurrence: ${sum}`;
      unique.add(sum);
    }
  }

  return { pt1, pt2 };
}