"use strict";
const fs = require('fs');

const puzzles = new Map([
  ['day1', ['./day01.js', 'input/01.txt']],
  ['day2', ['./day02.js', 'input/02.txt']]
]);


const run = (day) => {
  const [solve, input] = puzzles.get(day);
  fs.readFile(input, 'utf8', (err, data) => {
    if (err) throw err;

    const { pt1, pt2 } = require(solve)(data);
    console.log(`${day} PART1: ${pt1()}`);
    console.log(`${day} PART2: ${pt2()}`);
  });
}

run('day2');