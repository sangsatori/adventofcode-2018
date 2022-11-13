class CharLinkedList {
    constructor(arr) {
        this.size = arr.length;
        this.data = new Map();

        arr.map(value => [Symbol(), value]).forEach(([key, value], i, a) => {
            if (i === 0)
                this.head = key;
            if (i === (this.size - 1))
                this.tail = key;
            this.data.set(key, {
                value,
                prev:
                    i !== 0
                    ? a[i-1][0]
                    : null,
                next:
                    i < (this.size - 1)
                    ? a[i+1][0]
                    : null
            });
        });
    }
    *[Symbol.iterator]() {
        let keyA = this.head;
        while (keyA !== this.tail) {
            const { value: valueA, next: keyB } = this.data.get(keyA);
            yield [
                [keyA, valueA], [
                    keyB,
                    this.data.get(keyB).value
                ]
            ];
            keyA = keyB;
        }
    }

    [Symbol.toPrimitive](hint) {
        switch (hint) {
            case "number":
                return this.size;
            case "string":
                let key = this.head;
                let string = '';
                while (key !== null) {
                    const { value, next } = this.data.get(key);
                    string += value;
                    key = next;
                }
                return string;
            case "default":
            default:
                return true;
        }
    }

    remove(key) {
        const { prev, next } = this.data.get(key);

        if (key !== this.head) {
            this.data.get(prev).next = next;
        } else {
            this.head = next;
        }

        if (key !== this.tail) {
            this.data.get(next).prev = prev;
        } else {
            this.tail = prev;
        }

        this.data.delete(key);
        this.size -= 1;
    }
}

function eliminate(arr) {
    let series = new CharLinkedList(arr);

    let pendingSweep = new Set();
    let lastSweepCount = 0;

    do {
        for (let [[keyA, valueA], [keyB, valueB]] of series) {
            if (
                valueA !== valueB
                && valueA.toLowerCase() === valueB.toLowerCase()
                && !pendingSweep.has(keyA)
            ) {
                pendingSweep.add(keyA);
                pendingSweep.add(keyB);
            }
        }

        lastSweepCount = pendingSweep.size;
        for (let key of pendingSweep) {
            series.remove(key);
        }

        pendingSweep.clear();
    } while (lastSweepCount > 0);
    return series;
}

export default (input) => {
    const tokens = input[0];

    return [
        () => Number(eliminate(tokens.split(''))), // 10762,
        () => {
            const chars = new Set(input[0].toLowerCase().split(''));
            const results = new Map();

            for (let char of chars) {
                results.set(char, Number(eliminate(tokens.replaceAll(new RegExp(char, 'ig'), '').split(''))));
            }

            let shortestChar = null;
            let shortestLength = null;;
            for (let [char, length] of results.entries()) {
                if ((length < shortestLength) || (shortestLength === null)) {
                    shortestLength = length;
                    shortestChar = char;
                }
            }

            console.log(`${shortestChar.toUpperCase()}/${shortestChar} @${shortestLength}`);
            return shortestLength; // 6946
        }
    ]
}