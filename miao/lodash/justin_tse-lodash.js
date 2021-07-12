var justin_tse = function () {
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

  return {
    chunk: chunk,
  }
}()
