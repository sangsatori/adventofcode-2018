export default (input) => {
    const tokens = input.map(str => {
        const { timestamp, event } = [...str.matchAll(/\[(?<timestamp>.*?)\] (?<event>.*)/g)][0].groups;
        return [new Date(timestamp), event];
    }).sort(([a], [b]) =>
        a === b
        ? 0
        : a > b
        ? 1
        : -1
     );

     // let's re-use this for both solutions
     const guards = new Map();
     let id, ts, event, from, to;
     for (let i = 0; i < tokens.length; i++) {
         [ts, event] = tokens[i];
         id = event.match(/Guard #(?<id>\d+) begins shift/)?.groups?.id ?? id
         if (!guards.has(id)) {
             guards.set(id, { total: 0, sleeps: []})
         }
         if (event === 'falls asleep') {
             from = ts.getMinutes();
             to = tokens[i+1][0].getMinutes();
             guards.get(id).total += (to - from);
             guards.get(id).sleeps.push([from, to]);
             i++; // skip next step
         }
     }

    return [
        () => {
            let sleepsMost = { id: null, total: null }; // total > undefined evals to false, ugh
            for (let [id, { total }] of guards) {
                if (total > sleepsMost.total) {
                    sleepsMost = { id, total }
                }
            }

            let minutes = new Array(60).fill(0);
            for (let [from, to] of guards.get(sleepsMost.id).sleeps) {
                for (let i = from; i < to; i++) {
                    minutes[i]++;
                }
            }
            const mostTimesAsleep = Math.max(...minutes);

            return Number.parseInt(sleepsMost.id, 10) * minutes.findIndex(x => x === mostTimesAsleep); // 115167
        },
        () => {
            let minutes = new Array(60).fill(null).map(() => new Map([...guards.keys()].map(id => [id, 0])));
            for (let [id, { sleeps }] of guards.entries()) {
                for (let [from, to] of sleeps) {
                    for (let i = from; i < to; i++) {
                        // blagh, should have used an object instead of a map
                        minutes[i].set(id, minutes[i].get(id) + 1);
                    }
                }
            }

            let xs = minutes.map(x => {
                let highest = { count: null, id: null };
                for (let [id, count] of x.entries()) {
                    if (count > highest.count) {
                        highest = { id, count }
                    }
                }
                return highest;
            })

            let maxMinute, maxId, maxCount = null;
            // XXX: can use reduce here
            xs.forEach(({id, count }, i) => {
                if (count > maxCount) {
                    maxCount = count;
                    maxId = id;
                    maxMinute = i;
                }
            });

            return Number.parseInt(maxId, 10) * maxMinute; // 32070
        }
    ]
}