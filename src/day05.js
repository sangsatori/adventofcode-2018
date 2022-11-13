// linked lists?

/* const sample = 'dabAcCaCBAcCcaDA'; */

// 0: dabAcCaCBAcCcaDA -> remove cC
// 1: dabAaCBAcCcaDA -> remove Aa
// 2: dabCBAcCcaDA -> cC
// results in 'dabCBAcaDA'

// let's print the linked list...
function* readList({ head, data }) {
    let key = head;
    while (key !== null) {
        let { value: { char, isUppercase }, next } = data.get(key);
        yield isUppercase ? char.toUpperCase() : char;
        key = next;
    }
}

export default (input) => {
    // can we use WeakMap here..?
    /* const tokens = sample.split(''); */
    const tokens = input[0].split('');

    return [
        () => {
            const list = {
                head: 0,
                data: new Map(tokens.map((value, key, { length }) => [key, {
                    // guess we can bastardize this...
                    value: {
                        char: value.toLowerCase(),
                        isUppercase: Boolean(value.match(/[A-Z]/g))
                    },
                    prev:
                        key !== 0
                            ? (key - 1)
                            : null,
                    next:
                        key < (length - 1)
                            ? key + 1
                            : null
                }]))
            };

            let removed;
            do {
                removed = false;
                // XXX: could implement an iterator here...
                let key = list.head;
                let a, b; // current, next

                while (key !== null) {
                    a = list.data.get(key);
                    b = list.data.get(a.next);
                    if (!a || !b) {
                        break;
                    };
                    if ( // eliminate
                        (a.value.char === b.value.char) // same char
                        && (a.value.isUppercase !== b.value.isUppercase) // different cases
                    ) {
                        removed = true;
                        if (a.prev === null) { // move head
                            list.data.get(b.next).prev = null;
                            list.head = b.next;
                        } else {
                            list.data.get(a.prev).next = b.next;
                            if (b.next !== null) { // if not at tail
                                list.data.get(b.next).prev = a.prev;
                            }
                        }
                        key = b.next;
                    } else { // none eliminated
                        key = a.next; // go to next
                    }
                }
            } while (removed);

            // XXX: we can implement a .size property
            // 10762
            return [...readList()].length; // [...readList()].join(''); to read
        },
        () => {

        }
    ]
}