var justin_tse = function () {
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
  function difference(arr, ...array) {
    let result = [];
    let excludeArray = concat(...array);
    
    for (let i = 0; i < arr.length; i++) {
      if (!excludeArray.includes(arr[i])) {
        result.push(arr[i]);
      }
    }

    return result;
  }

  return {
    chunk: chunk,
    compact: compact,
    concat: concat,
    difference: difference,
  }
}()
