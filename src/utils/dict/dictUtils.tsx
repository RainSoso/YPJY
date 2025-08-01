import { getDictItemsByValue } from './JDictSelectUtil';

export function columnRender(dictCode: string, value: string, forceDisplayType: null | 'text' | 'tags' | 'original' = null, onClick: Function | null = null) {
  let array: any = [];
  (getDictItemsByValue(dictCode, value) || []).forEach(item => {
    if (forceDisplayType == 'text' || !forceDisplayType && !!item.color && item.displayType == 'text') {
      array.push(<span class={onClick && 'cursor-pointer' || ''} style={{ color: item.color }} onClick={(e) => { onClick && onClick({ e, item }); }}>{item?.text}</span>);
    } else if (forceDisplayType == 'tags' || !forceDisplayType && !!item.color && item.displayType == 'tags') {
      array.push(<a-tag class={onClick && 'lg cursor-pointer' || 'lg'} color={item.color} onClick={(e) => { onClick && onClick({ e, item }); }}>{item?.text}</a-tag>);
    } else {
      array.push(item?.text);
    }
  });
  return array;
}
