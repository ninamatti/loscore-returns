// Let's make an object and start adding methods to it!
class LoScore {
  identity(val) {
    return val;
  }

  /**
  | ARRAYS
  |~~~~~~~~~~
  * */
  uniq(array) {
    const arr = [];
    for (let i = 0; i < array.length; i++) {
      if (!arr.includes(array[i])) arr.push(array[i]);
    }
    return arr;
  }

  /**
  | COLLECTIONS
  |~~~~~~~~~~
  * */
  each(collection, iterator) {
    if (collection instanceof Array) {
      for (let i = 0; i < collection.length; i += 1) {
        iterator(collection[i], i, collection);
      }
    } else {
      const keys = Object.keys(collection);
      for (let i = 0; i < keys.length; i += 1) {
        iterator(collection[keys[i]], keys[i], collection);
      }
    }
  }

  map(collection, iteratee) {
    const arr = [];
    this.each(collection, (value) => {
      arr.push(iteratee(value));
    });
    return arr;
  }

  filter(collection, test) {
    const result = [];
    this.each(collection, (val) => test(val) && result.push(val));
    return result;
  }

  reject(collection, test) {
    const arr = [];
    this.filter(collection, (value) => {
      if (!test(value)) arr.push(value);
    });
    return arr;
  }

  reduce(collection, iterator, accumulator) {
    if (accumulator === undefined) {
      accumulator = collection[0];
      const arr = collection.slice(1);
      this.each(arr, (value) => {
        return (accumulator = iterator(accumulator, value));
      });
    } else {
      this.each(collection, (value) => {
        return (accumulator = iterator(accumulator, value));
      });
    }
    return accumulator;
  }

  every(collection, predicate) {
    if (collection.length === 0) return true;
    return this.reduce(
      collection,
      (isTrue, value) => {
        if (predicate === undefined) return true;
        if (!isTrue) return false;
        if (!predicate(value)) return false;
        return true;
      },
      true
    );
  }

  /**
  | OBJECTS
  |~~~~~~~~~~
  * */
  extend(obj, ...args) {
    this.each(args, (newObj) => {
      for (const key in newObj) {
        obj[key] = newObj[key];
      }
    });
    return obj;
  }

  /**
  | FUNCTIONS
  |~~~~~~~~~~
  * */

  once(func) {
    let calledBefore = false;
    let result;
    return function(input) {
      if (calledBefore === false) {
        result = func(input);
        calledBefore = true;
        return result;
      }
      return result;
    };
  }

  memoize(func) {
    const history = {};
    return function(input) {
      if (input in history) {
        return input;
      }
      const result = func(input);
      history[input] = JSON.stringify(result);
      return result;
    };
  }

  invoke(collection, functionOrKey) {
    return this.map(collection, (input) => {
      if (typeof functionOrKey === "function") {
        return functionOrKey.apply(input);
      }
      return input[functionOrKey].apply(input);
    });
  }

  /**
  | ADVANCED REQUIREMENTS
  |~~~~~~~~~~~~~
  * */

  sortBy() {
    // YOUR CODE HERE
  }

  zip() {
    // YOUR CODE HREE
  }

  delay() {
    // YOUR CODE HERE
  }

  defaults() {
    // YOUR CODE HERE
  }

  throttle() {
    // YOUR CODE HERE
  }
}

module.exports = new LoScore();
