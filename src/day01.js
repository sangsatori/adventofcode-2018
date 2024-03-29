const loop = (arr) => function* () {
  let i = 0;
  while (true) {
    yield [arr[i % arr.length], i];
    i++;
  }
};

export default (input) => {
  const tokens = input.map(str => Number.parseInt(str, 10));
  return [
    () => tokens.reduce((a, b) => a + b, 0),
    () => {
      const unique = new Set();
      let sum = 0;
      for (let [n, i] of loop(tokens)()) {
        sum += n;
        if (unique.has(sum)) return `iterations: ${i} / occurrence: ${sum}`;
        unique.add(sum);
      }
    }
  ];
}