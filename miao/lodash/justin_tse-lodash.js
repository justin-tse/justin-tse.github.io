var justin_tse = function () {
  // Base function
  function iteratee(predicate) {
    if (typeof predicate === "function") {
      return predicate;
    }
    if (typeof predicate === "string") {
      return property(predicate);
    }
    if (Array.isArray(predicate)) {
      return matchesProperty(...predicate);
    }
    if (typeof predicate === "object") {
      return matches(predicate);
    }
  }

  function get(object, path, defaultValue = undefined) {
    if (path.length == 0) {
      return defaultValue;
    }

    path = toPath(path);
    for (let i = 0; i < path.length; i++) {
      if (object == undefined) {
        return defaultValue;
      } else {
        object = object[path[i]];
      }
    }
    return object;
  }

  function toPath(val) {
    if (Array.isArray(val)) {
      return val;
    } else {
      return val.split('][')
        .reduce((ary, it) => ary.concat(it.split('].')), [])
        .reduce((ary, it) => ary.concat(it.split('[')), [])
        .reduce((ary, it) => ary.concat(it.split('.')), [])
    }
  }
  // 传入什么属性名，它返回的函数就用来获取对象的什么属性名
  function property(prop) {// a.b
    // return get.bind(null, window, prop);
    // 下面两句等价于 return get.bind(null, window, prop);
    return function (obj) {
      return get(obj, prop);
    }
  }

  function matchesProperty(path, val) {
    return function (object) {
      return isEqual(get(object, path), val);
    }
  }

  function isMatch(object, source) {
    if (object == source) {
      return true;
    }

    if (typeof object !== 'object' || typeof source !== 'object') {
      return false;
    }

    for (let key in source) {
      if (source[key] && typeof source[key] !== 'object') {
        if (object[key] !== source[key]) {
          return false;
        }
      } else {
        if (!isMatch(object[key], source[key])) {
          return false;
        }
      }
    }
    return true;
  }

  function matches(src) {
    // return bind(isMatch, null, window, src);
    return function (obj) {
      return isMatch(obj, src);
    }
  }

  function bind(f, thisArg, ...fixedArgs) { // bind(f, {}, 1, _, _, 3, _, 4)
    return function (...args) { // 5,8
      var ary = fixedArgs.slice();
      var j = 0;
      for (var i = 0; i < ary.length; i++) {
        if (Object.is(ary[i], bind.placeholder)) {
          if (j < args.length) {
            ary[i] = args[j++];
          } else {
            ary[i] = undefined;
          }
        }
      }
      while (j < args.length) {
        ary.push(args[j++]);
      }
      return f.apply(thisArg, ary);
    }
  }
  bind.placeholder = NaN;

  // function f(a,b) {
  //   return Math.max(10,a,b)
  // }
  // var f = Math.max.bind(null, 10)
  function isEqual(value, other) {
    if (value === other) {
      return true;
    }

    if (typeof value != typeof other) {
      return false;
    }

    if (typeof value == "object") {
      if ((Array.isArray(value) && !Array.isArray(other)) || (!Array.isArray(value) && Array.isArray(other))) {
        return false;
      }

      if (Array.isArray(value)) {
        if (value.length !== other.length) {
          return false;
        }
      } else {
        let keysValue = Object.keys(value);
        let keysOther = Object.keys(other);
        if (keysValue.length !== keysOther.length) {
          return false;
        }
      }
      for (let key in value) {
        if (!(key in other)) {
          return false;
        }
        if (!isEqual(value[key], other[key])) {
          return false;
        }
      }
      return true;
    }

    return false;
  }

  function identity(val) {
    return val;
  }

  //---------------------------------------
  function chunk(arr, n) {
    let result = [];
    let temp = [];
    let count = 0;

    for (let i = 0; i < arr.length; i++) {
      temp.push(arr[i]);
      count++;
      if (count == n) {
        count = 0;
        result.push(temp);
        temp = [];
      }
    }

    if (temp.length > 0) {
      result.push(temp);
    }

    return result;
  }


  function compact(arr, n) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
      let ele = arr[i];
      if (!(ele === false || ele === null || ele === 0 || ele === "" || ele === undefined || Number.isNaN(ele))) {
        result.push(ele);
      }
    }

    return result;
  }


  function difference(arr, ...arrays) {
    let result = [];
    let excludeArray = concat(...arrays);

    for (let i = 0; i < arr.length; i++) {
      if (!excludeArray.includes(arr[i])) {
        result.push(arr[i]);
      }
    }

    return result;
  }


  function differenceBy(ary, ...arrays) {
    let last = arrays.pop();
    if (Array.isArray(last)) {
      return difference(ary, ...arrays)
    } else {
      let predicate = iteratee(last);
      let result = [];
      let excludeArray = concat(...arrays);
      for (let i = 0; i < excludeArray.length; i++) {
        excludeArray[i] = predicate(excludeArray[i]);
      }

      for (let i = 0; i < ary.length; i++) {
        if (!excludeArray.includes(predicate(ary[i]))) {
          result.push(ary[i]);
        }
      }

      return result;
    }
  }


  function differenceWith() { }


  function drop() { }


  function dropRight() { }


  function dropRightWhile() { }


  function dropWhile() { }


  function fill() { }


  function findIndex() { }


  function findLastIndex() { }


  function flatten() { }


  function flattenDeep(array) {
    let result = [];
    for (let i = 0; i < array.length; i++) {
      let item = array[i];
      if (Array.isArray(item)) {
        item = flattenDeep(item);
        for (let j = 0; j < item.length; j++) {
          result.push(item[j]);
        }
      } else {
        result.push(item);
      }
    }

    return result;
  }


  function flattenDepth(array, depth = 1) {
    if (depth == 0) {
      return array.slice();
    }

    let result = [];
    for (let i = 0; i < array.length; i++) {
      let item = array[i];

      if (Array.isArray(item)) {
        item = flattenDepth(item, depth - 1);
        for (let j = 0; j < item.length; j++) {
          result.push(item[j]);
        }
      } else {
        result.push(item);
      }
    }

    return result;
  }


  function fromPairs() { }


  function head() { }


  function indexOf() { }


  function initial() { }


  function intersection() { }


  function intersectionBy() { }


  function intersectionWith() { }


  function join() { }


  function last() { }


  function lastIndexOf() { }


  function nth() { }


  function pull() { }


  function pullAll() { }


  function pullAllBy() { }


  function pullAllWith() { }


  function reverse() { }


  function sortedIndex() { }


  function sortedIndexBy() { }


  function sortedIndexOf() { }


  function sortedLastIndex() { }


  function sortedLastIndexOf() { }


  function sortedLastIndexBy() { }


  function sortedUniq() { }


  function sortedUniqBy() { }


  function tail() { }


  function take() { }


  function takeRight() { }


  function takeRightWhile() { }


  function takeWhile() { }


  function union() { }


  function unionBy() { }


  function unionWith() { }


  function uniq(array) {
    let mapped = new Map();
    let result = [];

    for (let i = 0; i < array.length; i++) {
      let ele = array[i];
      if (!mapped.has(ele)) {
        mapped.set(ele, true);
        result.push(array[i]);
      }
    }

    return result;
  }


  function uniqBy(array, f = it => it) {
    let mapped = new Map();
    let result = [];
    let ele;

    for (let i = 0; i < array.length; i++) {
      if ((typeof f) === "function") {
        ele = f(array[i]);
      } else {
        ele = array[i][f];
      }
      if (!mapped.has(ele)) {
        mapped.set(ele, true);
        result.push(array[i]);
      }
    }

    return result;
  }


  function uniqWith() { }


  function unzip() { }


  function unzipWith() { }


  function without() { }


  function xor() { }


  function xorBy() { }


  function xorWith() { }


  function zip() { }


  function zipObject() { }


  function zipObjectDeep() { }


  function zipWith() { }


  function countBy() { }


  function every() { }


  function filter() { }


  function find() { }


  function findLast() { }


  function flatMap() { }


  function flatMapDeep() { }


  function flatMapDepth() { }


  function forEach(collection, iteratee) {
    for (let key in collection) {
      iteratee(collection[i]);
    }
  }



  function forEach(collection, iteratee) {
    for (let key in collection)
      iteratee(collection[key], key, collection)
    return collection
  }
  function forEachRight() { }


  function groupBy() { }


  function includes() { }


  function invokeMap() { }


  function keyBy() { }


  function map() { }


  function orderBy() { }


  function partition() { }


  function reduce() { }


  function reduceRight() { }


  function reject() { }


  function sample() { }


  function sampleSize() { }


  function shuffle() { }


  function size() { }


  function some() { }


  function sortBy() { }


  function defer() { }


  function delay() { }


  function castArray() { }


  function conformsTo() { }


  function eq() { }


  function gt() { }


  function gte() { }


  function isArguments() { }


  function isArray() { }


  function isArrayBuffer() { }


  function isArrayLike() { }


  function isArrayLikeObject() { }


  function isBoolean() { }


  function isDate() { }


  function isElement() { }


  function isEmpty() { }


  function isEqual() { }


  function isEqualWith() { }


  function isError() { }


  function isFinite() { }


  function isFunction() { }


  function isInteger() { }


  function isLength() { }


  function isMap() { }


  function isMatch() { }


  function isMatchWith() { }


  function isNaN() { }


  function isNative() { }


  function isNil() { }


  function isNull() { }


  function isNumber() { }


  function isObject() { }


  function isObjectLike() { }


  function isPlainObject() { }


  function isRegExp() { }


  function isSafeInteger() { }


  function isSet() { }


  function isString() { }


  function isSymbol() { }


  function isTypedArray() { }


  function isUndefined() { }


  function isWeakMap() { }


  function isWeakSet() { }


  function lt() { }


  function lte() { }


  function toArray() { }


  function toFinite() { }


  function toInteger() { }


  function toLength() { }


  function toNumber() { }


  function assign() { }


  function toSafeInteger() { }


  function add() { }


  function ceil() { }


  function divide() { }


  function floor() { }


  function max() { }


  function maxBy() { }


  function mean() { }


  function meanBy() { }


  function min() { }


  function minBy() { }


  function multiply() { }


  function round() { }


  function subtract() { }


  function sum() { }


  function sumBy() { }


  function clamp() { }


  function inRange() { }


  function random() { }


  function assignIn() { }


  function at() { }


  function defaults() { }


  function defaultsDeep() { }


  function findKey() { }


  function findLastKey() { }


  function forIn() { }


  function forInRight() { }


  function forOwn() { }


  function forOwnRight() { }


  function functions() { }


  function functionsIn() { }


  function get() { }


  function has() { }


  function hasIn() { }


  function invert() { }


  function invertBy() { }


  function invoke() { }


  function keys() { }


  function keysIn() { }


  function mapKeys() { }


  function mapValues() { }


  function merge() { }


  function mergeWith() { }


  function omit() { }


  function omitBy() { }


  function pick() { }


  function pickBy() { }


  function result() { }


  function set() { }


  function setWith() { }


  function toPairs() { }


  function toPairsIn() { }


  function transform() { }


  function unset() { }


  function update() { }


  function updateWith() { }


  function values() { }


  function valuesIn() { }


  function camelCase() { }


  function capitalize() { }


  function deburr() { }


  function endsWith() { }


  function escape() { }


  function escapeRegExp() { }


  function kebabCase() { }


  function lowerCase() { }


  function lowerFirst() { }


  function pad() { }


  function padEnd() { }


  function padStart() { }


  function parseInt() { }


  function repeat() { }


  function replace() { }


  function snakeCase() { }


  function split() { }


  function startCase() { }


  function startsWith() { }


  function toLower() { }


  function toUpper() { }


  function trim() { }


  function trimEnd() { }


  function trimStart() { }


  function truncate() { }


  function unescape() { }


  function upperCase() { }


  function upperFirst() { }


  function words() { }


  function bindAll() { }


  function defaultTo() { }


  function range() { }


  function rangeRight() { }


  function mixin() { }


  function times() { }


  function toPath() { }


  function uniqueId() { }


  function cloneDeep() { }


  function identity() { }


  function concat(arr, ...args) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
      result.push(arr[i]);
    }

    args = Array.from(arguments).slice(1);
    for (let i = 0; i < args.length; i++) {
      let item = args[i];
      if (Array.isArray(item)) {
        for (let j = 0; j < item.length; j++) {
          result.push(item[j]);
        }
      } else {
        result.push(item);
      }
    }

    return result;
  }


  function pullAt() { }


  function matches() { }


  function property() { }


  function ary() { }


  function unary() { }


  function negate() { }


  function once() { }


  function spread() { }


  function curry() { }


  function memoize() { }


  function flip() { }


  function conforms() { }


  function constant() { }


  function flow() { }


  function method() { }


  function methodOf() { }


  function nthArg() { }


  function propertyOf() { }


  function parseJson(input) {
    var str = input;
    var i = 0;
    return parseValue();

    function parseValue() {
      var c = str[i];

      if (c == '[') {
        return parseArray();
      }
      if (c == '{') {
        return parseObject();
      }
      if (c == '"') {
        return parseString();
      }
      if (c == 't') {
        return parseTrue();
      }
      if (c == 'f') {
        return parseFalse();
      }
      if (c == 'n') {
        return parseNull();
      }
      return parseNumber();
    }

    // 从i指向的位置解析出一个true，并将i指向true的下一个位置
    function parseTrue() {
      var s = str.substr(i, 4);
      if (s !== 'true') {
        throw new SyntaxError('unexpected token:' + s + 'at pos' + i);
      }
      i += 4;
      return true;
    }

    function parseFalse() {
      i += 5;
      return false;
    }

    function parseNull() {
      i += 4;
      return null;
    }

    // 从i指向的位置（此时是"）解析出一个字符串，并将i移动到字符串之后
    function parseString() {
      i++; // 跳过当前双引号
      var result = '';
      while (str[i] !== '"') {
        result += str[i++];
      }
      i++; // 跳过最后一个双引号
      return result;
    }

    // 从i指向的位置解析出一个数值，此时i已经指向了该数值的最左一位
    function parseNumber() {
      var numStr = '';
      while (str[i] >= '0' && str[i] <= '9') {
        numStr += str[i++];
      }
      return Number(numStr);
    }

    // 此时i指向数组开始的中括号（[），解析出这个数组，移动i到数组后面，并返回解析出的数组
    function parseArray() {
      var result = [];
      i++;
      while (str[i] !== ']') {
        skipSpace();
        var val = parseValue();
        skipSpace();
        result.push(val);
        if (str[i] == ',') {
          i++; // 跳过这个逗号
          skipSpace();
        } else if (str[i] == ']') {
          break;
        } else {
          throw new SyntaxError('unexpected token at pos' + i);
        }
      }
      i++;
      return result;
    }

    // 此时i指向对象开始的中括号（{），解析出这个对象，移动i到对象后面，并返回解析出的对象
    function parseObject() {
      var result = {};
      i++;
      while (str[i] !== '}') {
        var key = parseString();
        i++; // 跳过冒号
        var val = parseValue();
        result[key] = val;
        if (str[i] == ',') {
          i++;
        }
      }
      i++;
      return result;
    }
  }

  
  function stringifyJson() { }


  return {
    chunk: chunk,
    compact: compact,
    concat: concat,
    difference: difference,
    differenceBy: differenceBy,
    differenceWith: differenceWith,
    drop: drop,
    dropRight: dropRight,
    dropRightWhile: dropRightWhile,
    dropWhile: dropWhile,
    fill: fill,
    findIndex: findIndex,
    findLastIndex: findLastIndex,
    flatten: flatten,
    flattenDeep: flattenDeep,
    flattenDepth: flattenDepth,
    fromPairs: fromPairs,
    head: head,
    indexOf: indexOf,
    initial: initial,
    intersection: intersection,
    intersectionBy: intersectionBy,
    intersectionWith: intersectionWith,
    join: join,
    last: last,
    lastIndexOf: lastIndexOf,
    nth: nth,
    pull: pull,
    pullAll: pullAll,
    pullAllBy: pullAllBy,
    pullAllWith: pullAllWith,
    reverse: reverse,
    sortedIndex: sortedIndex,
    sortedIndexBy: sortedIndexBy,
    sortedIndexOf: sortedIndexOf,
    sortedLastIndex: sortedLastIndex,
    sortedLastIndexOf: sortedLastIndexOf,
    sortedLastIndexBy: sortedLastIndexBy,
    sortedUniq: sortedUniq,
    sortedUniqBy: sortedUniqBy,
    tail: tail,
    take: take,
    takeRight: takeRight,
    takeRightWhile: takeRightWhile,
    takeWhile: takeWhile,
    union: union,
    unionBy: unionBy,
    unionWith: unionWith,
    uniq: uniq,
    uniqBy: uniqBy,
    uniqWith: uniqWith,
    unzip: unzip,
    unzipWith: unzipWith,
    without: without,
    xor: xor,
    xorBy: xorBy,
    xorWith: xorWith,
    zip: zip,
    zipObject: zipObject,
    zipObjectDeep: zipObjectDeep,
    zipWith: zipWith,
    countBy: countBy,
    every: every,
    filter: filter,
    find: find,
    findLast: findLast,
    flatMap: flatMap,
    flatMapDeep: flatMapDeep,
    flatMapDepth: flatMapDepth,
    forEach: forEach,
    forEachRight: forEachRight,
    groupBy: groupBy,
    includes: includes,
    invokeMap: invokeMap,
    keyBy: keyBy,
    map: map,
    orderBy: orderBy,
    partition: partition,
    reduce: reduce,
    reduceRight: reduceRight,
    reject: reject,
    sample: sample,
    sampleSize: sampleSize,
    shuffle: shuffle,
    size: size,
    some: some,
    sortBy: sortBy,
    defer: defer,
    delay: delay,
    castArray: castArray,
    conformsTo: conformsTo,
    eq: eq,
    gt: gt,
    gte: gte,
    isArguments: isArguments,
    isArray: isArray,
    isArrayBuffer: isArrayBuffer,
    isArrayLike: isArrayLike,
    isArrayLikeObject: isArrayLikeObject,
    isBoolean: isBoolean,
    isDate: isDate,
    isElement: isElement,
    isEmpty: isEmpty,
    isEqual: isEqual,
    isEqualWith: isEqualWith,
    isError: isError,
    isFinite: isFinite,
    isFunction: isFunction,
    isInteger: isInteger,
    isLength: isLength,
    isMap: isMap,
    isMatch: isMatch,
    isMatchWith: isMatchWith,
    isNaN: isNaN,
    isNative: isNative,
    isNil: isNil,
    isNull: isNull,
    isNumber: isNumber,
    isObject: isObject,
    isObjectLike: isObjectLike,
    isPlainObject: isPlainObject,
    isRegExp: isRegExp,
    isSafeInteger: isSafeInteger,
    isSet: isSet,
    isString: isString,
    isSymbol: isSymbol,
    isTypedArray: isTypedArray,
    isUndefined: isUndefined,
    isWeakMap: isWeakMap,
    isWeakSet: isWeakSet,
    lt: lt,
    lte: lte,
    toArray: toArray,
    toFinite: toFinite,
    toInteger: toInteger,
    toLength: toLength,
    toNumber: toNumber,
    assign: assign,
    toSafeInteger: toSafeInteger,
    add: add,
    ceil: ceil,
    divide: divide,
    floor: floor,
    max: max,
    maxBy: maxBy,
    mean: mean,
    meanBy: meanBy,
    min: min,
    minBy: minBy,
    multiply: multiply,
    round: round,
    subtract: subtract,
    sum: sum,
    sumBy: sumBy,
    clamp: clamp,
    inRange: inRange,
    random: random,
    assignIn: assignIn,
    at: at,
    defaults: defaults,
    defaultsDeep: defaultsDeep,
    findKey: findKey,
    findLastKey: findLastKey,
    forIn: forIn,
    forInRight: forInRight,
    forOwn: forOwn,
    forOwnRight: forOwnRight,
    functions: functions,
    functionsIn: functionsIn,
    get: get,
    has: has,
    hasIn: hasIn,
    invert: invert,
    invertBy: invertBy,
    invoke: invoke,
    keys: keys,
    keysIn: keysIn,
    mapKeys: mapKeys,
    mapValues: mapValues,
    merge: merge,
    mergeWith: mergeWith,
    omit: omit,
    omitBy: omitBy,
    pick: pick,
    pickBy: pickBy,
    result: result,
    set: set,
    setWith: setWith,
    toPairs: toPairs,
    toPairsIn: toPairsIn,
    transform: transform,
    unset: unset,
    update: update,
    updateWith: updateWith,
    values: values,
    valuesIn: valuesIn,
    camelCase: camelCase,
    capitalize: capitalize,
    deburr: deburr,
    endsWith: endsWith,
    escape: escape,
    escapeRegExp: escapeRegExp,
    kebabCase: kebabCase,
    lowerCase: lowerCase,
    lowerFirst: lowerFirst,
    pad: pad,
    padEnd: padEnd,
    padStart: padStart,
    parseInt: parseInt,
    repeat: repeat,
    replace: replace,
    snakeCase: snakeCase,
    split: split,
    startCase: startCase,
    startsWith: startsWith,
    toLower: toLower,
    toUpper: toUpper,
    trim: trim,
    trimEnd: trimEnd,
    trimStart: trimStart,
    truncate: truncate,
    unescape: unescape,
    upperCase: upperCase,
    upperFirst: upperFirst,
    words: words,
    bindAll: bindAll,
    defaultTo: defaultTo,
    range: range,
    rangeRight: rangeRight,
    mixin: mixin,
    times: times,
    toPath: toPath,
    uniqueId: uniqueId,
    cloneDeep: cloneDeep,
    identity: identity,
    concat: concat,
    pullAt: pullAt,
    matches: matches,
    property: property,
    ary: ary,
    unary: unary,
    negate: negate,
    once: once,
    spread: spread,
    curry: curry,
    memoize: memoize,
    flip: flip,
    conforms: conforms,
    constant: constant,
    flow: flow,
    method: method,
    methodOf: methodOf,
    nthArg: nthArg,
    propertyOf: propertyOf,
    parseJson: parseJson,
    stringifyJson: stringifyJson,
  }
}()
