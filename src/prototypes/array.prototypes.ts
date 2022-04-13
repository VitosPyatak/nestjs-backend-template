Array.prototype.while = function (predicate) {
    const array = [];
    for (const [index, value] of this.entries()) {
        if (predicate(value, index, this)) {
            array.push(value);
        } else break;
    }
    return array;
};

Object.defineProperty(Array.prototype, 'last', {
    get() {
        return this[this.length - 1];
    },
});

Object.defineProperty(Array.prototype, 'first', {
    get() {
        return this[0];
    },
});