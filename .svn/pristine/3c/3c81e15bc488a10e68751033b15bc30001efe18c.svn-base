/**
 * 字典 util
 * author: scott
 * date: 20190109
 */

import { ajaxGetDictItems, getDictItemsByCode } from './index';
import { getCacheByDynKey, setCacheByDynKey } from '/@/utils/auth';
import { getCategoryItemByCode } from '/@/api/common/api';
import { isArray, isObject, isUnDef, isString } from '../is';
import { DB_CATEGORY_DATA_KEY } from '/@/enums/cacheEnum';

/**
 * 获取字典数组
 * @param dictCode 字典Code
 * @param isTransformResponse 是否转换返回结果
 * @return List<Map>
 */
export async function initDictOptions(dictCode, isTransformResponse = true) {
  if (!dictCode) {
    return '字典Code不能为空!';
  }
  //优先从缓存中读取字典配置
  if (getDictItemsByCode(dictCode)) {
    let res = {};
    res.result = getDictItemsByCode(dictCode);
    res.success = true;
    if (isTransformResponse) {
      return res.result;
    } else {
      return res;
    }
  }
  //获取字典数组
  return await ajaxGetDictItems(dictCode, {}, { isTransformResponse });
}

/**
 * 字典值替换文本通用方法
 * @param dictOptions  字典数组
 * @param text  字典值
 * @return String
 */
export function filterDictText(dictOptions, text) {
  // --update-begin----author:sunjianlei---date:20200323------for: 字典翻译 text 允许逗号分隔 ---
  if (text != null && Array.isArray(dictOptions)) {
    let result = [];
    // 允许多个逗号分隔，允许传数组对象
    let splitText;
    if (Array.isArray(text)) {
      splitText = text;
    } else {
      splitText = text.toString().trim().split(',');
    }
    for (let txt of splitText) {
      let dictText = txt;
      for (let dictItem of dictOptions) {
        if (txt.toString() === dictItem.value.toString()) {
          dictText = dictItem.text || dictItem.title || dictItem.label;
          break;
        }
      }
      result.push(dictText);
    }
    return result.join(',');
  }
  return text;
  // --update-end----author:sunjianlei---date:20200323------for: 字典翻译 text 允许逗号分隔 ---
}

/**
 * 字典值替换文本通用方法(多选)
 * @param dictOptions  字典数组
 * @param text  字典值
 * @return String
 */
export function filterMultiDictText(dictOptions, text) {
  //js “!text” 认为0为空，所以做提前处理
  if (text === 0 || text === '0') {
    if (dictOptions) {
      for (let dictItem of dictOptions) {
        if (text == dictItem.value) {
          return dictItem.text;
        }
      }
    }
  }

  if (!text || text == 'undefined' || text == 'null' || !dictOptions || dictOptions.length == 0) {
    return '';
  }
  let re = '';
  text = text.toString();
  let arr = text.split(',');
  dictOptions.forEach(function (option) {
    if (option) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === option.value) {
          re += option.text + ',';
          break;
        }
      }
    }
  });
  if (re == '') {
    return text;
  }
  return re.substring(0, re.length - 1);
}

/**
 * 翻译字段值对应的文本
 * @param children
 * @returns string
 */
export function filterDictTextByCache(dictCode, key) {
  if (key == null || key.length == 0) {
    return;
  }
  if (!dictCode) {
    return '字典Code不能为空!';
  }
  //优先从缓存中读取字典配置
  if (getDictItemsByCode(dictCode)) {
    let item = getDictItemsByCode(dictCode).filter((t) => t['value'] == key);
    if (item && item.length > 0) {
      return item[0]['text'];
    }
  }
}

/** 通过code获取字典数组 */
export async function getDictItems(dictCode, params) {
  //优先从缓存中读取字典配置
  if (getDictItemsByCode(dictCode)) {
    let desformDictItems = getDictItemsByCode(dictCode).map((item) => ({
      ...item,
      label: item.text,
    }));
    return desformDictItems;
  }

  //缓存中没有，就请求后台
  return await ajaxGetDictItems(dictCode, params)
    .then((result) => {
      let res = result.map((item) => ({ ...item, label: item.text }));
      console.log('------- 从DB中获取到了字典-------dictCode : ', dictCode, res);
      return Promise.resolve(res);
    })
    .catch((res) => {
      console.error('getDictItems error: ', res);
      return Promise.resolve([]);
    });
}

export function getDictItemsByValue(dictCode, key) {
  if (key === '' || key === null || key === undefined) return [];
  let result = [];
  let data = getDictItemsByCode(dictCode) || [];
  let array = (key + '').split(",");
  data.forEach((item)=>{
    array.forEach((k)=>{
      if ((item.value+'')==k) {
        result.push(item);
      }
    });
  });
  return result;
}

export function getDictText(dictCode, key) {
  if (key === '' || key === null || key === undefined) return '';
  let result = [];
  let data = getDictItemsByCode(dictCode);
  let array = (key + '').split(",");
  data?.forEach((item)=>{
    array.forEach((k)=>{
      if ((item.value+'')==k) {
        result.push(item.text);
      }
    });
  });
  return result.join(',');
}

export async function getCategoriesByCode(code) {
  if (!isArray(code)) code = ((code || '') + '').split(',');
  let array = [], queryCode = [], localCache = getCacheByDynKey(DB_CATEGORY_DATA_KEY) || {};
  code.forEach(item => {
    if (isUnDef(localCache[item])) queryCode.push(item);
  });
  if (0 < queryCode.length) {
    let res = await getCategoryItemByCode({ codes: queryCode.join(','), delNotExist: true });
    res.forEach(item => {
      localCache[item.code] = item;
    });
    setCacheByDynKey(DB_CATEGORY_DATA_KEY, localCache);
  }
  code.forEach((item, idx) => {
    localCache[item] && array.push(localCache[item]);
  });
  return array;
}

export async function getCategoryText(code) {
  return (await getCategoriesByCode(code)).map(item => item.name).join(',');
}
