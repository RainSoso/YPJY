import REGION_DATA from '/@/utils/area/areaData';

// code转汉字大对象
const CodeToText = {};

for (const province in REGION_DATA['86']) {
  CodeToText[province] = REGION_DATA['86'][province];
  for (const city in REGION_DATA[province]) {
    CodeToText[city] = REGION_DATA[province][city];
    if (!REGION_DATA[city]) continue;
    for (const district in REGION_DATA[city]) {
      CodeToText[district] = REGION_DATA[city][district];
    }
  }
}

/**
 * 根据code获取text
 * @param code
 * @returns {String}
 */
export function getTextByCode(code) {
  return CodeToText[code] || '';
}

/**
 * 将code转为右like查询的值
 * @param code
 * @returns {String}
 */
export function getLikeValue(code) {
  code = (code || '').replace(/[\s0]+$/ig, '');
  if (code) code = code.length % 2 != 0 ? code + '0*' : (code + '*');
  return code;
}
