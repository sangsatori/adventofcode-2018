import * as fs from 'node:fs/promises';

import day1 from './day01.js';
import day2 from './day02.js';
import day3 from './day03.js';
import day4 from './day04.js';
import day5 from './day05.js';

async function run() {
  for (let [i, solve] of [
    [1, day1],
    [2, day2],
    [3, day3],
    [4, day4],
    [5, day5]
  ]) {
    const day = (i).toString().padStart(2, 0);
    const input = (await fs.readFile(`input/${day}.txt`, { encoding: 'utf-8' }))
      .trim()
      .split('\n');
  
    console.log(`DAY${day} --`);
    solve(input).forEach((pt, i) => {
      console.log(`* Pt. ${i+1}: ${pt()}`);
    });
  };
}

run();
