var justin_tse = function () {
  //Array: https://lodash.com/docs/4.17.15#chunk
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

  return {
    chunk: chunk,
    compact: compact,
  }
}()
