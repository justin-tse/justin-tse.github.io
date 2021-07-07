function flatten(arrays) {
  let result = [];
  for (let i = 0; i < arrays.length; i++) {
    for (let j = 0; j < arrays[i].length; j++) {
      result.push(arrays[i][j]);
    }
  }

  return result;
}

function flatten(arrays) {
  let result = [];
  for (let i = 0; i < arrays.length; i++) {
    result = result.concat(arrays[i]);
  }

  return result;
}

function flatten(arrays) {
  return arrays.reduce((a, b) => a.concat(b));
}
