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
    if (object == undefined || path.length == 0) {
      return defaultValue;
    }

    path = toPath(path);
    for (let i = 0; i < path.length; i++) {
      object = object[path[i]];
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
          if (keysValue !== keysOther) {
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

    /* Lodash: Array */
    //https://lodash.com/docs/4.17.15#chunk
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

    // https://lodash.com/docs/4.17.15#compact
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

    // https://lodash.com/docs/4.17.15#concat
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

    // https://lodash.com/docs/4.17.15#difference
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

    https://lodash.com/docs/4.17.15#uniq
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

    // https://lodash.com/docs/4.17.15#uniqBy
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

    // https://lodash.com/docs/4.17.15#flattenDeep
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

    // https://lodash.com/docs/4.17.15#flattenDepth
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

    https://lodash.com/docs/4.17.15#forEach
    function forEach(array, f) {
      for (let i = 0; i < array.length; i++) {
        f(array[i]);
      }
    }

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



  return {
    chunk: chunk,
    compact: compact,
    concat: concat,
    difference: difference,
    uniq: uniq,
    uniqBy: uniqBy,
    flattenDeep: flattenDeep,
    flattenDepth: flattenDepth,
    isEqual: isEqual,
    property: property,
    get: get,
    toPath: toPath,
    isMatch: isMatch,
    matches: matches,
    identity: identity,
    parseJson: parseJson,

  }
}()
