function merge_consecutive_negative_number(ary) {
  let result = [];
  let sum = 0;
  for (let num of ary) {
    if (num >= 0) {
      if (sum < 0) {
        result.push(sum)
        sum = 0;
      }
      result.push(num)
    } else {
      sum += num
    }
  }
  return result;
}

function merge_consecutive_negative_number2(ary) {
  let sum = 0;
  for (var i = j = 0; i < ary.length; i++) {
    if (ary[i] >= 0) {
      if (sum < 0) {
        ary[j++] = sum
        sum = 0;
      }
      ary[j++] = ary[i]
    } else {
      sum += ary[i]
    }
  }
  return ary.slice(0, j);
}
