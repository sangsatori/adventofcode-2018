export default (input) => {
    const tokens = input.map(line => {
        const [id, x, y, w, h] = [...line.matchAll(/\d+/g)].map(([x]) => parseInt(x, 10));
        return [id, { x, y, w, h }];
    });

    const limit = 2000;

    const area = new Array(limit*limit).fill(null);
    const claims = new Set();
    for (let [id, { x, y, w, h }] of tokens) {
        claims.add(id);
        let index;
        for (let xStep = x; xStep < (x + w); xStep++) {
            for (let yStep = y; yStep < (y + h); yStep++) {
                index = (yStep * limit) + xStep;
                if (area[index]) {
                    area[index].push(id);
                    for (let x of area[index]) {
                        claims.delete(x);
                    }
                } else {
                    area[index] = [id];
                }
            }
        }
    }
    return [
        () => area.filter(x => x !== null && x.length > 1).length, // 118322
        () => [...claims.values()] // 1178
    ]
}