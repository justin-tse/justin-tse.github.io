// 实现函数判断通配符与字符串的匹配关系
// 通配符中 * 代表任意内容，?代表任意单个符号

function wildcardMatching(wildcard, str) {
  let changeStr = '';
  for (let i = 0; i < wildcard.length; i++) {
    if (wildcard[i] === '?') {
      changeStr += '[\\\S]';
    } else if (wildcard[i] === '*') {
      changeStr += '[\\\S]*'
    } else {
      changeStr += wildcard[i];
    }
  }

  let re = new RegExp(changeStr);
  return re.exec(str) ? re.exec(str)[0] === str : false;
}

wildcardMatching('??ccd', 'abccd') // -> true
wildcardMatching('*', 'abccd') // -> true
wildcardMatching('a*cd', 'abccd') // -> true
wildcardMatching('x*ccd', 'abccd') // -> false
