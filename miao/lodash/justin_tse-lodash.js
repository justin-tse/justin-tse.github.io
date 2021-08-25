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
    } code
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
    return get.bind(null, window, prop);
    // 下面两句等价于 return get.bind(null, window, prop);
    // return function(obj) {
    //   return get(obj, prop);
    // }

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
        var ary = fixedArgs.slice()
        var j = 0
        for (var i = 0; i < ary.length; i++) {
          if (Object.is(ary[i], bind.placeholder)) {
            if (j < args.length) {
              ary[i] = args[j++]
            } else {
              ary[i] = undefined
            }
          }
        }
        while (j < args.length) {
          ary.push(args[j++])
        }
        return f.apply(thisArg, ary)
      }
    }
    bind.placeholder = NaN

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

    function identity(val) {
      return val
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

    }
  } ()
