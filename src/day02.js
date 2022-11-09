const intersect = (a, b) => {
  const res = a
    .map((val, i) => val === b[i] && val)
    .filter(val => val); // truthy
  return (a.length - res.length) === 1 && res;
}

export default (input) => {
  const tokens = input.map(line => line.split(''));
  return [
    () => {
      let two = 0;
      let three = 0;
      tokens.forEach(line => {
        const counter = {};
        for (let char of line) {
          if (counter.hasOwnProperty(char)) {
            counter[char]++;
          } else counter[char] = 1;
        }
        const totals = Object.values(counter);
        if (totals.includes(2)) two++;
        if (totals.includes(3)) three++;
      });
      return two * three;
    },
    () => {
      let match;
      for (let a of tokens) {
        for (let b of tokens) {
          match = intersect(a, b);
          if (match) return match.join('');
        }
      }
    }
  ]
}